export type Macros = {
  proteinG: number;
  carbsG: number;
  fatG: number;
};

export type Food = {
  id: string;
  name: string;
  description: string;
  /** Valores aproximados por 100 g de alimento pronto a comer. */
  kcalPer100g: number;
  macrosPer100g: Macros;
  defaultPortionG: number;
};

export type Meal = {
  id: string;
  food: Food;
  portionG: number;
  kcal: number;
  macros: Macros;
  photoUri?: string;
  eatenAt: number;
};

export type RecognitionResult = {
  food: Food;
  /** 0..1 */
  confidence: number;
};
