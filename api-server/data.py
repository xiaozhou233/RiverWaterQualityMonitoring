import csv
import os
from collections import deque
from config import *

# 表头： time, ph, tds, turbidity

# 插入数据
def insert_data(time, ph, tds, turbidity):
    need_header = (
        not os.path.exists(DATA_FILE)
        or os.path.getsize(DATA_FILE) == 0
    )

    with open(DATA_FILE, "a", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)

        if need_header:
            writer.writerow(["time", "ph", "tds", "turbidity"])

        writer.writerow([time, ph, tds, turbidity])

# 获取最新100条数据
def get_data(limit=100):
    data = deque(maxlen=limit)

    try:
        with open(DATA_FILE, "r", newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            if reader.fieldnames is None:
                return []

            for row in reader:
                try:
                    row["ph"] = float(row["ph"])
                    row["tds"] = float(row["tds"])
                    row["turbidity"] = float(row["turbidity"])
                    data.append(row)
                except (ValueError, TypeError, KeyError):
                    continue

    except FileNotFoundError:
        return []

    return list(data)

# 获取最新数据
def get_last_data():
    data = get_data()

    if not data:
        return None

    return data[-1]