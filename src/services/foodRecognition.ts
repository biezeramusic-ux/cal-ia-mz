import type { FoodAnalysis } from '@/types';

export const SYSTEM_PROMPT =
  "You are an expert Mozambican Nutritionist AI. Analyze the food image. You must accurately recognize typical Mozambican culinary dishes, ingredients, and portions (e.g., matapa, xima, mucapata, caril de amendoim, cacana, badgias, peixe grelhado, caril de caranguejo, etc.) and estimate the weight in grams. Return strictly a clean JSON object: { 'food_name': string, 'estimated_weight_grams': number, 'calories': number, 'carbs_g': number, 'protein_g': number, 'fats_g': number }.";

const API_URL = process.env.EXPO_PUBLIC_FOOD_API_URL;
const TIMEOUT_MS = 25_000;

export const MOCK_VEGETABLE_SALAD: FoodAnalysis = {
  food_name: 'Vegetable Salad',
  estimated_weight_grams: 350,
  calories: 180,
  carbs_g: 22,
  protein_g: 6,
  fats_g: 8,
};

export interface RecognitionResult {
  analysis: FoodAnalysis;
  source: 'api' | 'mock';
}

function isNum(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0;
}

/** Aceita JSON puro ou envolto em ```json ... ``` e valida o formato. */
export function parseAnalysis(raw: unknown): FoodAnalysis {
  let data: unknown = raw;
  if (typeof raw === 'string') {
    const cleaned = raw.replace(/```json|```/gi, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    data = JSON.parse(start >= 0 && end > start ? cleaned.slice(start, end + 1) : cleaned);
  }
  const o = data as Partial<Record<keyof FoodAnalysis, unknown>>;
  if (
    typeof o.food_name !== 'string' ||
    !o.food_name ||
    !isNum(o.estimated_weight_grams) ||
    !isNum(o.calories) ||
    !isNum(o.carbs_g) ||
    !isNum(o.protein_g) ||
    !isNum(o.fats_g)
  ) {
    throw new Error('Resposta da IA inválida');
  }
  return {
    food_name: o.food_name,
    estimated_weight_grams: Math.round(o.estimated_weight_grams),
    calories: Math.round(o.calories),
    carbs_g: Math.round(o.carbs_g),
    protein_g: Math.round(o.protein_g),
    fats_g: Math.round(o.fats_g),
  };
}

/**
 * Envia a imagem (já comprimida, Base64) para o backend/proxy de IA.
 * A chave da API fica no servidor, nunca dentro do app.
 * Em caso de falha de rede ou resposta inválida, devolve o mock de salada.
 */
export async function analyzeFood(imageBase64: string): Promise<RecognitionResult> {
  if (!API_URL) return { analysis: MOCK_VEGETABLE_SALAD, source: 'mock' };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_prompt: SYSTEM_PROMPT,
        image_base64: imageBase64,
        mime_type: 'image/jpeg',
      }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body: unknown = await res.json();
    return { analysis: parseAnalysis(body), source: 'api' };
  } catch {
    return { analysis: MOCK_VEGETABLE_SALAD, source: 'mock' };
  } finally {
    clearTimeout(timer);
  }
}
