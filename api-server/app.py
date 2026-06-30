from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import root
from routers import upload
from routers import get

app = FastAPI()

# 允许跨域
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 根目录路由
app.include_router(root.router)
# 数据上传路由
app.include_router(upload.router)
# 数据获取路由
app.include_router(get.router)