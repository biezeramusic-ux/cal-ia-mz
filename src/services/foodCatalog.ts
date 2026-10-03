import type { FoodAnalysis, Ingredient, IconName } from '@/types';

interface CatalogIngredient {
  name: string;
  share: number; // % do peso do prato
  icon: IconName;
  color: string;
}

interface CatalogDish {
  aliases: string[];
  name: string;
  defaultGrams: number;
  per100g: { kcal: number; carbs: number; protein: number; fats: number };
  ingredients: CatalogIngredient[];
}

export const CATALOG: readonly CatalogDish[] = [
  {
    aliases: ['xima com matapa', 'matapa', 'xima'],
    name: 'Xima com Matapa',
    defaultGrams: 400,
    per100g: { kcal: 125, carbs: 20, protein: 3.5, fats: 3.5 },
    ingredients: [
      { name: 'Xima (farinha de milho)', share: 55, icon: 'corn', color: '#FFB74D' },
      { name: 'Matapa (folhas de mandioca)', share: 30, icon: 'leaf', color: '#66BB6A' },
      { name: 'Amendoim e coco', share: 10, icon: 'seed', color: '#A1887F' },
      { name: 'Óleo e alho', share: 5, icon: 'water', color: '#FFD54F' },
    ],
  },
  {
    aliases: ['caril de amendoim', 'frango com caril de amendoim'],
    name: 'Caril de Amendoim com Arroz',
    defaultGrams: 420,
    per100g: { kcal: 165, carbs: 17, protein: 8, fats: 7.5 },
    ingredients: [
      { name: 'Arroz', share: 45, icon: 'rice', color: '#FFCC80' },
      { name: 'Frango', share: 25, icon: 'food-drumstick', color: '#EF9A9A' },
      { name: 'Molho de amendoim', share: 25, icon: 'seed', color: '#A1887F' },
      { name: 'Cebola e tomate', share: 5, icon: 'food-apple', color: '#EF5350' },
    ],
  },
  {
    aliases: ['peixe grelhado', 'peixe grelhado com xima'],
    name: 'Peixe Grelhado com Xima',
    defaultGrams: 380,
    per100g: { kcal: 140, carbs: 14, protein: 12, fats: 4 },
    ingredients: [
      { name: 'Peixe grelhado', share: 40, icon: 'fish', color: '#4FC3F7' },
      { name: 'Xima', share: 45, icon: 'corn', color: '#FFB74D' },
      { name: 'Salada de tomate e cebola', share: 15, icon: 'food-apple', color: '#EF5350' },
    ],
  },
  {
    aliases: ['mucapata'],
    name: 'Mucapata',
    defaultGrams: 250,
    per100g: { kcal: 220, carbs: 38, protein: 5, fats: 5 },
    ingredients: [
      { name: 'Farinha de arroz', share: 60, icon: 'rice', color: '#FFCC80' },
      { name: 'Coco', share: 25, icon: 'seed', color: '#BCAAA4' },
      { name: 'Açúcar', share: 10, icon: 'cube-outline', color: '#F8BBD0' },
      { name: 'Fermento de palmeira', share: 5, icon: 'bottle-tonic', color: '#CE93D8' },
    ],
  },
  {
    aliases: ['cacana'],
    name: 'Cacana',
    defaultGrams: 200,
    per100g: { kcal: 130, carbs: 28, protein: 1.5, fats: 0.5 },
    ingredients: [
      { name: 'Mandioca', share: 85, icon: 'carrot', color: '#D7CCC8' },
      { name: 'Sal e água', share: 15, icon: 'water', color: '#81D4FA' },
    ],
  },
  {
    aliases: ['badjias', 'badgias', 'bajia'],
    name: 'Badjias',
    defaultGrams: 120,
    per100g: { kcal: 280, carbs: 28, protein: 9, fats: 14 },
    ingredients: [
      { name: 'Feijão-boer / grão', share: 65, icon: 'seed', color: '#A1887F' },
      { name: 'Cebola e especiarias', share: 20, icon: 'leaf', color: '#66BB6A' },
      { name: 'Óleo de fritura', share: 15, icon: 'water', color: '#FFD54F' },
    ],
  },
  {
    aliases: ['caril de caranguejo', 'caranguejo'],
    name: 'Caril de Caranguejo',
    defaultGrams: 350,
    per100g: { kcal: 135, carbs: 8, protein: 12, fats: 6 },
    ingredients: [
      { name: 'Caranguejo', share: 45, icon: 'fish', color: '#EF5350' },
      { name: 'Leite de coco', share: 30, icon: 'seed', color: '#BCAAA4' },
      { name: 'Arroz', share: 20, icon: 'rice', color: '#FFCC80' },
      { name: 'Especiarias', share: 5, icon: 'leaf', color: '#66BB6A' },
    ],
  },
  {
    aliases: ['arroz com feijão', 'arroz e feijão'],
    name: 'Arroz com Feijão',
    defaultGrams: 380,
    per100g: { kcal: 140, carbs: 25, protein: 5, fats: 2 },
    ingredients: [
      { name: 'Arroz', share: 60, icon: 'rice', color: '#FFCC80' },
      { name: 'Feijão', share: 35, icon: 'seed', color: '#A1887F' },
      { name: 'Óleo e cebola', share: 5, icon: 'water', color: '#FFD54F' },
    ],
  },
  {
    aliases: ['vegetable salad', 'salada'],
    name: 'Vegetable Salad',
    defaultGrams: 350,
    per100g: { kcal: 51, carbs: 6.3, protein: 1.7, fats: 2.3 },
    ingredients: [
      { name: 'Alface', share: 35, icon: 'leaf', color: '#81C784' },
      { name: 'Tomate', share: 25, icon: 'food-apple', color: '#EF5350' },
      { name: 'Cenoura', share: 20, icon: 'carrot', color: '#FFB74D' },
      { name: 'Pepino', share: 15, icon: 'leaf-circle', color: '#4DB6AC' },
      { name: 'Azeite', share: 5, icon: 'water', color: '#FFD54F' },
    ],
  },
];

const normalize = (s: string): string =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

export function findDish(query: string): CatalogDish | undefined {
  const q = normalize(query);
  if (!q) return undefined;
  return CATALOG.find((d) => {
    const names = [d.name, ...d.aliases].map(normalize);
    return names.some((n) => n === q || n.includes(q) || q.includes(n));
  });
}

/** Cria uma análise a partir do catálogo local (pesquisa manual). */
export function analysisFromCatalog(dish: CatalogDish, grams = dish.defaultGrams): FoodAnalysis {
  const f = grams / 100;
  return {
    food_name: dish.name,
    estimated_weight_grams: grams,
    calories: Math.round(dish.per100g.kcal * f),
    carbs_g: Math.round(dish.per100g.carbs * f),
    protein_g: Math.round(dish.per100g.protein * f),
    fats_g: Math.round(dish.per100g.fats * f),
  };
}

/** Decompõe o prato em ingredientes (catálogo local, ou estimativa pelos macros). */
export function deriveIngredients(a: FoodAnalysis): Ingredient[] {
  const dish = findDish(a.food_name);
  const total = Math.max(a.estimated_weight_grams, 1);
  if (dish) {
    return dish.ingredients.map((i) => ({
      name: i.name,
      icon: i.icon,
      color: i.color,
      percent: i.share,
      grams: Math.round((i.share / 100) * total),
    }));
  }
  const macroG = a.carbs_g + a.protein_g + a.fats_g;
  const rest = Math.max(total - macroG, 0);
  const parts: { name: string; grams: number; icon: IconName; color: string }[] = [
    { name: 'Carboidratos', grams: a.carbs_g, icon: 'rice', color: '#FFB74D' },
    { name: 'Proteínas', grams: a.protein_g, icon: 'food-drumstick', color: '#4FC3F7' },
    { name: 'Gorduras', grams: a.fats_g, icon: 'water', color: '#BA68C8' },
    { name: 'Água e fibras', grams: rest, icon: 'leaf', color: '#81C784' },
  ];
  return parts
    .filter((p) => p.grams > 0)
    .map((p) => ({ ...p, grams: Math.round(p.grams), percent: Math.round((p.grams / total) * 100) }));
}
