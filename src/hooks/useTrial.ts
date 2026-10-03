import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { FREE_SCANS_PER_DAY, PLANS, TRIAL_DAYS, type PlanId } from '@/constants/business';
import { KEYS, getJSON, setJSON, todayKey } from '@/services/storage';

interface TrialState {
  firstUse: string | null;
  scansByDay: Record<string, number>;
  premium: { plan: PlanId; expiresAt: string } | null;
}

const EMPTY: TrialState = { firstUse: null, scansByDay: {}, premium: null };
const DAY_MS = 86_400_000;

export type AccessStatus =
  | { kind: 'premium'; plan: PlanId; expiresAt: string }
  | { kind: 'trial'; scansLeft: number; daysLeft: number }
  | { kind: 'blocked'; reason: 'trial_expired' | 'daily_limit' };

export function computeStatus(s: TrialState, now: Date = new Date()): AccessStatus {
  if (s.premium && new Date(s.premium.expiresAt).getTime() > now.getTime()) {
    return { kind: 'premium', ...s.premium };
  }
  const first = s.firstUse ? new Date(s.firstUse).getTime() : now.getTime();
  const elapsedDays = Math.floor((now.getTime() - first) / DAY_MS);
  if (elapsedDays >= TRIAL_DAYS) return { kind: 'blocked', reason: 'trial_expired' };
  const used = s.scansByDay[todayKey(now)] ?? 0;
  if (used >= FREE_SCANS_PER_DAY) return { kind: 'blocked', reason: 'daily_limit' };
  return { kind: 'trial', scansLeft: FREE_SCANS_PER_DAY - used, daysLeft: TRIAL_DAYS - elapsedDays };
}

/** Estado do período de teste / assinatura. Recarrega sempre que o ecrã ganha foco. */
export function useTrial() {
  const [state, setState] = useState<TrialState>(EMPTY);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        const saved = await getJSON<TrialState>(KEYS.trial, EMPTY);
        // O primeiro uso é registado na primeira abertura do app.
        const next = saved.firstUse ? saved : { ...saved, firstUse: new Date().toISOString() };
        if (!saved.firstUse) await setJSON(KEYS.trial, next);
        if (active) {
          setState(next);
          setLoaded(true);
        }
      })();
      return () => {
        active = false;
      };
    }, []),
  );

  const registerScan = useCallback(async () => {
    const saved = await getJSON<TrialState>(KEYS.trial, EMPTY);
    const key = todayKey();
    const next: TrialState = {
      ...saved,
      firstUse: saved.firstUse ?? new Date().toISOString(),
      scansByDay: { ...saved.scansByDay, [key]: (saved.scansByDay[key] ?? 0) + 1 },
    };
    await setJSON(KEYS.trial, next);
    setState(next);
  }, []);

  const activatePremium = useCallback(async (plan: PlanId) => {
    const days = PLANS.find((p) => p.id === plan)?.durationDays ?? 7;
    const saved = await getJSON<TrialState>(KEYS.trial, EMPTY);
    const next: TrialState = {
      ...saved,
      premium: { plan, expiresAt: new Date(Date.now() + days * DAY_MS).toISOString() },
    };
    await setJSON(KEYS.trial, next);
    setState(next);
  }, []);

  return { status: computeStatus(state), loaded, registerScan, activatePremium };
}
