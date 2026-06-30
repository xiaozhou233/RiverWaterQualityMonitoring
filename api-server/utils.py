from datetime import datetime

def timenow():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")