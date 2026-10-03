import { Food, Meal } from '../types/food';

export function buildMeal(food: Food, portionG: number, photoUri?: string): Meal {
  const f = portionG / 100;
  return {
    id: `${Date.now()}-${food.id}`,
    food,
    portionG,
    kcal: Math.round(food.kcalPer100g * f),
    macros: {
      proteinG: Math.round(food.macrosPer100g.proteinG * f * 10) / 10,
      carbsG: Math.round(food.macrosPer100g.carbsG * f * 10) / 10,
      fatG: Math.round(food.macrosPer100g.fatG * f * 10) / 10,
    },
    photoUri,
    eatenAt: Date.now(),
  };
}
