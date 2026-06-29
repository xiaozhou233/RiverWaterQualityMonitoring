import random
import time
import requests

# API
URL = "http://127.0.0.1:8000/data/upload"
TOKEN = "mE7yG0kI"

INTERVAL = 0.05


def generate_ph():
    """Generate pH"""
    r = random.random()

    # 80% 正常
    if r < 0.80:
        return round(random.uniform(6.5, 8.5), 2)

    # 15% 一般
    elif r < 0.95:
        if random.random() < 0.5:
            return round(random.uniform(6.0, 6.5), 2)
        else:
            return round(random.uniform(8.5, 9.0), 2)

    # 5% 异常
    else:
        if random.random() < 0.5:
            return round(random.uniform(3.0, 6.0), 2)
        else:
            return round(random.uniform(9.0, 12.0), 2)


def generate_tds():
    """Generate TDS"""
    r = random.random()

    if r < 0.60:
        return round(random.uniform(50, 300), 1)

    elif r < 0.80:
        return round(random.uniform(300, 500), 1)

    elif r < 0.95:
        return round(random.uniform(500, 1000), 1)

    else:
        return round(random.uniform(1000, 2000), 1)


def generate_turbidity():
    """Generate Turbidity"""
    r = random.random()

    if r < 0.70:
        return round(random.uniform(0.1, 5), 2)

    elif r < 0.90:
        return round(random.uniform(5, 25), 2)

    elif r < 0.98:
        return round(random.uniform(25, 100), 2)

    else:
        return round(random.uniform(100, 300), 2)


def upload():
    ph = generate_ph()
    tds = generate_tds()
    turbidity = generate_turbidity()

    params = {
        "token": TOKEN,
        "ph": ph,
        "tds": tds,
        "turbidity": turbidity
    }

    try:
        response = requests.get(URL, params=params, timeout=5)

        print(
            f"[{response.status_code}] "
            f"pH={ph:5} "
            f"TDS={tds:6} "
            f"Turbidity={turbidity:6} "
            f"=> {response.text}"
        )

    except Exception as e:
        print("Upload failed:", e)


def main():
    print("Water Quality Data Generator Started")
    print("Press Ctrl+C to stop.\n")

    while True:
        upload()
        time.sleep(INTERVAL)


if __name__ == "__main__":
    main()