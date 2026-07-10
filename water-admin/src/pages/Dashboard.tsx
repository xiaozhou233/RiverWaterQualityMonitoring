import { IconMenu2 } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { Banner } from "../components/Banner";
import { SummaryCards } from "../components/SummaryCards";
import { WaterItems } from "../components/WaterItems";
import { WaterChart } from "../components/WaterChart";
import { useWaterData } from "../hooks/useWaterData";
import classes from "../assets/Dashboard.module.css";

const chartConfigs = [
  {
    title: "pH变化趋势",
    key: "ph" as const,
    min: 0,
    max: 14,
  },
  {
    title: "TDS变化趋势",
    key: "tds" as const,
    min: 0,
    max: 100,
  },
  {
    title: "浊度变化趋势",
    key: "turbidity" as const,
    min: 0,
    max: 1000,
  },
];

export default function Dashboard({
  onMenuClick,
}: {
  onMenuClick?: () => void;
  mobileNavOpen?: boolean;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data, error, isLoading, refetch } = useWaterData();

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {error ? (
          <>
            <div style={{ color: "red", fontSize: "16px" }}>{error}</div>
            <button
              onClick={() => void refetch()}
              style={{
                padding: "8px 16px",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              重试
            </button>
          </>
        ) : (
          <div>{isLoading ? "加载中..." : "暂无数据"}</div>
        )}
      </div>
    );
  }

  const history = data.data.slice(-100);
  const time = history.map((item) => item.time.substring(11, 19));

  return (
    <div className={classes.page}>
      <Banner
        menuButton={
          isMobile ? (
            <ActionIcon
              variant="light"
              onClick={onMenuClick}
              aria-label="Toggle navigation"
            >
              <IconMenu2 size={20} />
            </ActionIcon>
          ) : null
        }
      />

      <main className={classes.container}>
        <SummaryCards data={data} />
        <WaterItems data={data.score} />

        <section className={classes.chartGrid}>
          {chartConfigs.map((config) => (
            <WaterChart
              key={config.title}
              title={config.title}
              time={time}
              data={history.map((item) => item[config.key])}
              min={config.min}
              max={config.max}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
