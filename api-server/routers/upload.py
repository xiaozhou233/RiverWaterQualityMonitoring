from fastapi import APIRouter
import config
from utils import *
from data import *

router = APIRouter()

@router.get("/data/upload")
def data_upload_get(token:str, ph:float, tds:float, turbidity:float):
    time = timenow()

    # 验证token
    if token != config.TOKEN:
        return {
            "code" : 403,
            "status" : "error",
            "message" : "token error",
            "time" : time
        }
    
    insert_data(time, ph, tds, turbidity)

    return {
        "code" : 200,
        "status" : "success",
        "message" : "data upload success",
        "time" : time
    }