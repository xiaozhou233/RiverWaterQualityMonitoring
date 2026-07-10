import { useCallback, useEffect, useState } from "react";

import { getWaterData } from "../api/water";
import type { WaterData } from "../types/water";

export function useWaterData(pollingInterval = 3000) {
  const [data, setData] = useState<WaterData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setError("");
      setIsLoading(true);
      const result = await getWaterData();
      setData(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`加载数据失败: ${message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      void load();
    }, pollingInterval);

    const timeoutId = window.setTimeout(() => {
      void load();
    }, 0);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(timeoutId);
    };
  }, [load, pollingInterval]);

  return {
    data,
    error,
    isLoading,
    refetch: load,
  };
}
