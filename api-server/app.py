from fastapi import FastAPI
from datetime import datetime
from data import * 
from score import *

###
TOKEN = "mE7yG0kI"
###

app = FastAPI()

@app.get("/")
def root():
    return "OK"

# ESP8266 上传数据
@app.get("/data/upload")
def data_upload(token:str, ph:float, tds:float, turbidity:float):
    if token!= TOKEN:
        return {"status": "error", "message": "token error"}

    insert_data(datetime.now(), ph, tds, turbidity)

    return {"status": "ok", "message": "data_received"}

# 获取全部数据
@app.get("/data/all")
def data_all(token:str):
    if token!= TOKEN:
        return {"status": "error", "message": "token error"}

    return get_data()

# 获取最新数据
@app.get("/data/last")
def data_last(token:str):
    if token!= TOKEN:
        return {"status": "error", "message": "token error"}

    return get_last_data()

# 获取最新数据的评分
@app.get("/data/score")
def data_score(token:str):
    if token!= TOKEN:
        return {"status": "error", "message": "token error"}

    data = get_last_data()
    ph = data["ph"]
    tds = data["tds"]
    turbidity = data["turbidity"]

    score = calculate_score(ph, tds, turbidity)
    return score