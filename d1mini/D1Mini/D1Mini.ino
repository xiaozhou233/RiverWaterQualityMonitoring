#include <ESP8266WiFi.h>
#include <WiFiManager.h>
#include <ESP8266HTTPClient.h>

const char* serverUrl = "http://192.168.219.200:8000/";
const char* TOKEN = "mE7yG0kI";

char buffer[128];
uint8_t idx = 0;

/* ================= WIFI ================= */
void setup() {
  Serial.begin(115200);

  WiFiManager wm;
  if (!wm.autoConnect("ESP8266-Setup")) {
    Serial.println("ERR;WIFI");
    return;
  }

  Serial.print("OK;WIFI;IP;");
  Serial.println(WiFi.localIP());

  http_get_root();
}

/* ================= LOOP ================= */
void loop() {
  while (Serial.available()) {
    char c = Serial.read();

    if (c == '\n') {
      buffer[idx] = '\0';
      handleLine(buffer);
      idx = 0;
    } else if (idx < sizeof(buffer) - 1) {
      buffer[idx++] = c;
    }
  }
}

/* ================= SERIAL PARSER ================= */
void handleLine(char *line) {
  if (strncmp(line, "UPLOAD:", 7) == 0) {
    parseUpload(line + 7);
  } else {
    Serial.println("ERR;CMD");
  }
}

/* ================= DATA PARSER ================= */
void parseUpload(char *data) {
  double ph = 0, tds = 0, turbidity = 0;

  char *p = strtok(data, ";");

  while (p) {
    char *eq = strchr(p, '=');
    if (eq) {
      *eq = '\0';
      const char *key = p;
      const char *val = eq + 1;

      if (!strcmp(key, "ph")) ph = atof(val);
      else if (!strcmp(key, "tds")) tds = atof(val);
      else if (!strcmp(key, "turbidity")) turbidity = atof(val);
    }
    p = strtok(NULL, ";");
  }

  upload_data(ph, tds, turbidity);
}

/* ================= HTTP CORE ================= */
bool http_get(const String& url, String* resp = nullptr) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("ERR;WIFI");
    return false;
  }

  WiFiClient client;
  HTTPClient http;

  http.begin(client, url);
  int code = http.GET();

  if (code <= 0) {
    Serial.print("ERR;HTTP;");
    Serial.println(http.errorToString(code));
    http.end();
    return false;
  }

  if (resp) *resp = http.getString();

  Serial.print("OK;HTTP;");
  Serial.println(code);

  http.end();
  return true;
}

/* ================= ROOT REQUEST ================= */
void http_get_root() {
  String resp;
  http_get(String(serverUrl), &resp);

  Serial.print("OK;ROOT;");
  Serial.println(resp);
}

/* ================= DATA UPLOAD ================= */
void upload_data(double ph, double tds, double turbidity) {
  String url = String(serverUrl) + "data/upload?"
             + "ph=" + String(ph, 2)
             + "&tds=" + String(tds, 2)
             + "&turbidity=" + String(turbidity, 2)
             + "&token=" + TOKEN;

  Serial.println("OK;UPLOAD");

  String resp;
  if (http_get(url, &resp)) {
    Serial.print("OK;RESP;");
    Serial.println(resp);
  }
}