import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Meal } from '../types/food';

type MealsContextValue = {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (id: string) => void;
  totalKcal: number;
  totals: { proteinG: number; carbsG: number; fatG: number };
};

const MealsContext = createContext<MealsContextValue | null>(null);

// Estado em memória. Persistência (AsyncStorage/SQLite) fica para a próxima fase.
export function MealsProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  const addMeal = useCallback((meal: Meal) => setMeals((m) => [meal, ...m]), []);
  const removeMeal = useCallback(
    (id: string) => setMeals((m) => m.filter((x) => x.id !== id)),
    [],
  );

  const value = useMemo<MealsContextValue>(() => {
    const totals = meals.reduce(
      (acc, m) => ({
        proteinG: acc.proteinG + m.macros.proteinG,
        carbsG: acc.carbsG + m.macros.carbsG,
        fatG: acc.fatG + m.macros.fatG,
      }),
      { proteinG: 0, carbsG: 0, fatG: 0 },
    );
    return {
      meals,
      addMeal,
      removeMeal,
      totals,
      totalKcal: meals.reduce((s, m) => s + m.kcal, 0),
    };
  }, [meals, addMeal, removeMeal]);

  return <MealsContext.Provider value={value}>{children}</MealsContext.Provider>;
}

export function useMeals() {
  const ctx = useContext(MealsContext);
  if (!ctx) throw new Error('useMeals deve ser usado dentro de <MealsProvider>');
  return ctx;
}
