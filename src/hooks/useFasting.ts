import { useCallback, useEffect, useState } from 'react';
import { KEYS, getJSON, setJSON } from '@/services/storage';

/** Cronómetro de jejum intermitente; persiste o início para sobreviver ao fecho do app. */
export function useFasting() {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    getJSON<number | null>(KEYS.fasting, null).then(setStartedAt);
  }, []);

  useEffect(() => {
    if (startedAt === null) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  const start = useCallback(async () => {
    const t = Date.now();
    setNow(t);
    setStartedAt(t);
    await setJSON(KEYS.fasting, t);
  }, []);

  const stop = useCallback(async () => {
    setStartedAt(null);
    await setJSON(KEYS.fasting, null);
  }, []);

  const elapsedSec = startedAt === null ? 0 : Math.max(0, Math.floor((now - startedAt) / 1000));
  return { running: startedAt !== null, elapsedSec, start, stop };
}
