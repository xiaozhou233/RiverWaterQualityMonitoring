import type { WaterData } from "../types/water";
import classes from "../assets/Dashboard.module.css";

interface Props {
  data: WaterData;
}

export function SummaryCards({ data }: Props) {
  const score = data.score;

  return (
    <section className={classes.cards}>
      <div className={classes.card}>
        <p>综合评分</p>
        <strong>{score.score}</strong>
      </div>

      <div className={classes.card}>
        <p>综合等级</p>
        <strong>{score.level}</strong>
      </div>

      <div className={classes.card}>
        <p>系统状态</p>
        <strong
          className={
            score.abnormal
              ? classes.abnormal
              : classes.normal
          }
        >
          {score.abnormal ? "异常" : "正常"}
        </strong>
      </div>

      <div className={classes.card}>
        <p>数据更新时间</p>
        <strong>
          {data.time.substring(11, 19)}
        </strong>
      </div>
    </section>
  );
}