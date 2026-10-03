import type { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

export type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

/** Formato estrito devolvido pela IA. */
export interface FoodAnalysis {
  food_name: string;
  estimated_weight_grams: number;
  calories: number;
  carbs_g: number;
  protein_g: number;
  fats_g: number;
}

export interface Ingredient {
  name: string;
  grams: number;
  percent: number;
  icon: IconName;
  color: string;
}

export interface Meal extends FoodAnalysis {
  id: string;
  createdAt: string; // ISO
  photoUri?: string;
  ingredients: Ingredient[];
}
