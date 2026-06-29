import csv
import os

###
DATA_FILE = "database.csv"
###

# time, ph, tds, turbidity

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

# 获取所有数据
def get_data():
    with open(DATA_FILE, "r", newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        data = []

        for row in reader:
            row["ph"] = float(row["ph"])
            row["tds"] = float(row["tds"])
            row["turbidity"] = float(row["turbidity"])

            data.append(row)

        return data

# 获取最新数据
def get_last_data():
    data = get_data()

    if not data:
        return None

    return data[-1]