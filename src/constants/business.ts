export const TRIAL_DAYS = 3;
export const FREE_SCANS_PER_DAY = 2;

export type PlanId = 'weekly' | 'monthly' | 'yearly';

export interface Plan {
  id: PlanId;
  title: string;
  priceMT: number;
  period: string;
  durationDays: number;
  badge?: string;
}

export const PLANS: readonly Plan[] = [
  { id: 'weekly', title: 'Semanal', priceMT: 50, period: '/ semana', durationDays: 7 },
  { id: 'monthly', title: 'Mensal', priceMT: 187, period: '/ mês', durationDays: 30, badge: 'Mais Escolhido' },
  { id: 'yearly', title: 'Anual', priceMT: 1800, period: '/ ano', durationDays: 365, badge: 'Melhor Valor' },
];
