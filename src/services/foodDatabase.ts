import { Food } from '../types/food';

// Valores nutricionais aproximados — rever com tabelas oficiais antes de produção.
export const FOODS: Food[] = [
  {
    id: 'xima',
    name: 'Xima',
    description: 'Papa espessa de farinha de milho',
    kcalPer100g: 112,
    macrosPer100g: { proteinG: 2.5, carbsG: 24, fatG: 0.6 },
    defaultPortionG: 250,
  },
  {
    id: 'matapa',
    name: 'Matapa',
    description: 'Folhas de mandioca com coco e amendoim',
    kcalPer100g: 135,
    macrosPer100g: { proteinG: 4, carbsG: 8, fatG: 9.5 },
    defaultPortionG: 150,
  },
  {
    id: 'feijao-nhemba',
    name: 'Feijão nhemba',
    description: 'Feijão-frade cozido',
    kcalPer100g: 116,
    macrosPer100g: { proteinG: 8, carbsG: 21, fatG: 0.5 },
    defaultPortionG: 150,
  },
  {
    id: 'frango-zambeziana',
    name: 'Frango à zambeziana',
    description: 'Frango grelhado com leite de coco e piripiri',
    kcalPer100g: 190,
    macrosPer100g: { proteinG: 17, carbsG: 3, fatG: 12 },
    defaultPortionG: 200,
  },
  {
    id: 'arroz-coco',
    name: 'Arroz de coco',
    description: 'Arroz cozido em leite de coco',
    kcalPer100g: 180,
    macrosPer100g: { proteinG: 3, carbsG: 28, fatG: 6 },
    defaultPortionG: 200,
  },
  {
    id: 'peixe-grelhado',
    name: 'Peixe grelhado',
    description: 'Peixe fresco grelhado',
    kcalPer100g: 130,
    macrosPer100g: { proteinG: 22, carbsG: 0, fatG: 4 },
    defaultPortionG: 180,
  },
  {
    id: 'mandioca-cozida',
    name: 'Mandioca cozida',
    description: 'Raiz de mandioca cozida',
    kcalPer100g: 160,
    macrosPer100g: { proteinG: 1.4, carbsG: 38, fatG: 0.3 },
    defaultPortionG: 200,
  },
  {
    id: 'badjia',
    name: 'Badjia',
    description: 'Bolinho frito de feijão',
    kcalPer100g: 250,
    macrosPer100g: { proteinG: 9, carbsG: 25, fatG: 13 },
    defaultPortionG: 80,
  },
];

export const getFoodById = (id: string): Food | undefined =>
  FOODS.find((f) => f.id === id);
