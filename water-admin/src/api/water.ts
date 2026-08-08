import type { WaterData } from "../types/water.ts";


const API =
  "https://api.xiaozhou233.cn/water/data/integration";


export async function getWaterData()
: Promise<WaterData> {

  try {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch water data:", error);
    throw error;
  }

}