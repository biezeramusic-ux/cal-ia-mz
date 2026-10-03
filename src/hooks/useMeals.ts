import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import type { Meal } from '@/types';
import { KEYS, getJSON, setJSON, todayKey } from '@/services/storage';

export function useMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getJSON<Meal[]>(KEYS.meals, []).then((m) => active && setMeals(m));
      return () => {
        active = false;
      };
    }, []),
  );

  const todayMeals = meals.filter((m) => todayKey(new Date(m.createdAt)) === todayKey());
  return { meals, todayMeals };
}

export async function saveMeal(meal: Meal): Promise<void> {
  const all = await getJSON<Meal[]>(KEYS.meals, []);
  await setJSON(KEYS.meals, [meal, ...all.filter((m) => m.id !== meal.id)].slice(0, 200));
}
