from fastapi import APIRouter
import config
from utils import *
from data import *
from score import *

router = APIRouter()

# 获取number条数据
@router.get("/data/get/number/{number}")
def get_data_number(number: int):
    data = get_data(number)

    return {
        "code": 200,
        "status": "success",
        "message": f"获取{number}条数据成功",
        "data": data,
        "time": timenow()
    }

# 默认获取100条数据
@router.get("/data/get/")
def get_data_default():
    return get_data_number(100)


# 获取最新一条数据
@router.get("/data/get/latest")
def get_data_latest_api():

    return {
        "code": 200,
        "status": "success",
        "message": "获取最新一条数据成功",
        "data": get_last_data(),
        "time": timenow()
    }

# 获取最新数据评分
@router.get("/data/get/latest/score")
def get_data_latest_score():

    last_data = get_last_data()

    if last_data is None:
        return {
            "code": 404,
            "status": "error",
            "message": "暂无数据",
            "data": [],
            "time": timenow()
        }
    
    ph = last_data["ph"]
    tds = last_data["tds"]
    turbidity = last_data["turbidity"]
    time = last_data["time"]


    return {
        "code": 200,
        "status": "success",
        "message": "获取最新一条数据评分成功",
        "data": calculate_score(ph, tds, turbidity),
        "time": time
    }

# 数据整合
@router.get("/data/integration")
def data_integration():
    # 最近100条数据
    data = get_data(100)
    
    last_data = get_last_data()

    if last_data is None:
        return {
            "code": 404,
            "status": "error",
            "message": "暂无数据",
            "data": [],
            "time": timenow()
        }
    
    ph = last_data["ph"]
    tds = last_data["tds"]
    turbidity = last_data["turbidity"]
    time = last_data["time"]
    score = calculate_score(ph, tds, turbidity)

    return {
        "code": 200,
        "status": "success",
        "message": "成功整合数据",
        "data": data,
        "score": score,
        "time": time
    }