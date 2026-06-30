from fastapi import APIRouter
from datetime import datetime
from utils import *

router = APIRouter()

@router.get("/")
async def root():
    return {
        "code" : 200,
        "status" : "ok",
        "message" : "Welcome to the API",
        "time" : timenow()
    }