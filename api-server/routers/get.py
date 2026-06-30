from fastapi import APIRouter
import config
from utils import *

router = APIRouter()

# 获取number条数据
@router.get("/data/get/number/{number}")
def get_data(number: int):
    # TODO: 获取number条数据

    return {
        "code": 200,
        "status": "success",
        "message": f"获取{number}条数据成功",
        "data": [],
        "time": timenow()
    }

# 默认获取100条数据
@router.get("/data/get/")
def get_data_default():
    return get_data(100)


# 获取最新一条数据
@router.get("/data/get/latest")
def get_data_latest():
    # TODO: 获取最新一条数据

    return {
        "code": 200,
        "status": "success",
        "message": "获取最新一条数据成功",
        "data": [],
        "time": timenow()
    }

# 获取最新数据评分
@router.get("/data/get/latest/score")
def get_data_latest_score():
    # TODO: 获取最新一条数据评分

    return {
        "code": 200,
        "status": "success",
        "message": "获取最新一条数据评分成功",
        "data": [],
        "time": timenow()
    }

# # 获取最新数据的评分
# @app.get("/data/score")
# def data_score(token:str):
#     if token!= TOKEN:
#         return {"status": "error", "message": "token error"}

#     data = get_last_data()

#     if data is None:
#         return {
#             "code": 1,
#             "message": "暂无数据"
#         }
    
#     ph = data["ph"]
#     tds = data["tds"]
#     turbidity = data["turbidity"]

#     score = calculate_score(ph, tds, turbidity)
#     score["time"] = data["time"]
#     return score

# 数据整合
@router.get("/data/integration")
def data_integration():
    # TODO: 最近100条数据
    # TODO: 评分

    return {
        "code": 200,
        "status": "success",
        "message": "成功整合数据",
        "data": [],
        "time": timenow()
    }