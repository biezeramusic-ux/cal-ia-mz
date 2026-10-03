import { useCallback, useEffect, useState } from 'react';
import { KEYS, getJSON, setJSON, todayKey } from '@/services/storage';

export const WATER_GOAL = 8;
const MAX_GLASSES = 20;

interface WaterState {
  day: string;
  glasses: number;
}

export function useWater() {
  const [glasses, setGlasses] = useState(0);

  useEffect(() => {
    getJSON<WaterState | null>(KEYS.water, null).then((s) => {
      if (s && s.day === todayKey()) setGlasses(s.glasses);
    });
  }, []);

  const change = useCallback((delta: number) => {
    setGlasses((g) => {
      const next = Math.min(MAX_GLASSES, Math.max(0, g + delta));
      void setJSON<WaterState>(KEYS.water, { day: todayKey(), glasses: next });
      return next;
    });
  }, []);

  return { glasses, goal: WATER_GOAL, add: () => change(1), remove: () => change(-1) };
}
