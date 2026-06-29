# score.py

def score_ph(ph: float):
    if 6.5 <= ph <= 8.5:
        return 40, "优秀"

    if 6 <= ph <= 9:
        return 30, "合格"

    return 0, "异常"


def score_tds(tds: float):
    if tds < 300:
        return 30, "优秀"

    if tds < 500:
        return 25, "良好"

    if tds < 1000:
        return 15, "一般"

    return 0, "较差"


def score_turbidity(turbidity: float):
    if turbidity < 5:
        return 30, "优秀"

    if turbidity < 25:
        return 20, "一般"

    if turbidity < 100:
        return 10, "较差"

    return 0, "异常"

def calculate_score(ph, tds, turbidity):
    ph_score, ph_level = score_ph(ph)
    tds_score, tds_level = score_tds(tds)
    turbidity_score, turbidity_level = score_turbidity(turbidity)

    total = ph_score + tds_score + turbidity_score

    if total >= 90:
        level = "优秀"
    elif total >= 75:
        level = "良好"
    elif total >= 60:
        level = "一般"
    elif total >= 40:
        level = "较差"
    else:
        level = "异常"

    abnormal = (
        ph_level == "异常"
        or turbidity_level == "异常"
        or tds_level == "较差"
    )

    return {
        "score": total,
        "level": level,
        "abnormal": abnormal,
        "ph": {
            "value": ph,
            "score": ph_score,
            "level": ph_level
        },
        "tds": {
            "value": tds,
            "score": tds_score,
            "level": tds_level
        },
        "turbidity": {
            "value": turbidity,
            "score": turbidity_score,
            "level": turbidity_level
        }
    }