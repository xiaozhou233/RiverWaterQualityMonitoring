#include <ESP8266WiFi.h>
#include <WiFiManager.h>
#include <ESP8266HTTPClient.h>

const char* serverUrl = "http://192.168.219.200:8000/";
const char* TOKEN = "mE7yG0kI";

char buffer[128];
uint8_t idx = 0;

void setup() {
  Serial.begin(115200);

  WiFiManager wm;
  bool res = wm.autoConnect("ESP8266-Setup");

  if (!res) {
    Serial.println("WIFI_CONNECT_FAILED");
    return;
  }

  Serial.println("WIFI_CONNECTED");
  Serial.print("IP:");
  Serial.println(WiFi.localIP());

  http_get_root();
}

void loop() {
  while (Serial.available()) {
    char c = Serial.read();

    if (c == '\n') {
      buffer[idx] = '\0';
      handleLine(buffer);
      idx = 0;
    } else {
      if (idx < sizeof(buffer) - 1) {
        buffer[idx++] = c;
      }
    }
  }
}

void handleLine(char *line) {
  Serial.print("RECV:");
  Serial.println(line);

  // check command prefix
  if (strncmp(line, "UPLOAD:", 7) == 0) {
    parseUpload(line + 7);
  } else {
    Serial.println("UNKNOWN_CMD");
  }
}

void parseUpload(char *data) {
  double ph = 0;
  double tds = 0;
  double turbidity = 0;

  char *token = strtok(data, ";");

  while (token != NULL) {
    char *equal = strchr(token, '=');

    if (equal != NULL) {
      *equal = '\0';
      char *key = token;
      char *value = equal + 1;

      if (strcmp(key, "ph") == 0) {
        ph = atof(value);
      }
      else if (strcmp(key, "tds") == 0) {
        tds = atof(value);
      }
      else if (strcmp(key, "turbidity") == 0) {
        turbidity = atof(value);
      }
    }

    token = strtok(NULL, ";");
  }

  upload_data(ph, tds, turbidity);
}

void http_get_root() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WIFI_NOT_CONNECT");
    return;
  }

  HTTPClient http;
  WiFiClient client;

  Serial.println("SENDING_GET_REQUEST");

  http.begin(client, serverUrl);

  int httpCode = http.GET();

  if (httpCode > 0) {
    Serial.print("HTTP_CODE_");
    Serial.println(httpCode);

    String payload = http.getString();
    Serial.print("RESPONSE:");
    Serial.println(payload);
  } else {
    Serial.print("HTTP_REQUEST_FAILED_");
    Serial.println(http.errorToString(httpCode));
  }

  http.end();
}

void upload_data(double ph, double tds, double turbidity) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WIFI_NOT_CONNECT");
    return;
  }

  WiFiClient client;
  HTTPClient http;

  String url = String(serverUrl) + "data/upload?" +
               "ph=" + String(ph) +
               "&tds=" + String(tds) +
               "&turbidity=" + String(turbidity) +
               "&token=" + String(TOKEN);

  Serial.println("UPLOADING_DATA");
  Serial.println(url);

  http.begin(client, url);

  int httpCode = http.GET();

  if (httpCode > 0) {
    Serial.print("HTTP_CODE_");
    Serial.println(httpCode);

    Serial.print("RESPONSE:");
    Serial.println(http.getString());
  } else {
    Serial.print("HTTP_REQUEST_FAILED_");
    Serial.println(http.errorToString(httpCode));
  }

  http.end();
}