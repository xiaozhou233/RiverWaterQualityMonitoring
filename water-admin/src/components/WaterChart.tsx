import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import classes from "../assets/Dashboard.module.css";

interface Props {
  title: string;
  data: number[];
  time: string[];
  min?: number;
  max?: number;
}

export function WaterChart({
  title,
  data,
  time,
  min,
  max
}: Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const getGridConfig = () => {
    const width = window.innerWidth;

    if (width < 480) {
      return { left: 40, right: 10, top: 20, bottom: 25 };
    }

    if (width < 768) {
      return { left: 45, right: 15, top: 25, bottom: 30 };
    }

    return { left: 50, right: 20, top: 30, bottom: 35 };
  };

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    chartInstance.current.setOption({
      animation: true,
      tooltip: {
        trigger: "axis"
      },
      grid: getGridConfig(),
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: []
      },
      yAxis: {
        type: "value",
        min,
        max,
        splitNumber: 7,
        splitLine: {
          lineStyle: {
            color: "#eee"
          }
        }
      },
      series: [
        {
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: {
            width: 3
          },
          areaStyle: {
            opacity: 0.25
          },
          data: []
        }
      ]
    });

    const resize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chartInstance.current?.dispose();
    };
  }, [min, max]);

  useEffect(() => {
    chartInstance.current?.setOption({
      xAxis: {
        data: time
      },
      series: [
        {
          data
        }
      ]
    });
  }, [data, time]);

  return (
    <div className={classes.chart}>
      <h3>{title}</h3>
      <div
        ref={chartRef}
        className={classes.chartBody}
      />
    </div>
  );
}