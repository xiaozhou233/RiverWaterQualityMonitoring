import type { WaterScore } from "../types/water";
import classes from "../assets/Dashboard.module.css";

export function WaterItems({ data }: { data: WaterScore }) {
  const list = [
    {
      name: "pH",
      data: data.ph
    },
    {
      name: "TDS（溶解性总固体）",
      data: data.tds
    },
    {
      name: "浊度",
      data: data.turbidity
    }
  ];

  return (
    <section className={classes.items}>
      {list.map((item) => (
        <div
          className={classes.item}
          key={item.name}
        >
          <h3>{item.name}</h3>

          <div className={classes.value}>
            {item.data.value.toFixed(2)}
          </div>

          <div>
            等级：{item.data.level}
          </div>

          <div className={classes.score}>
            评分：{item.data.score}
          </div>
        </div>
      ))}
    </section>
  );
}