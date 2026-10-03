import { FOODS } from './foodDatabase';
import { RecognitionResult } from '../types/food';

/**
 * Ponto de integração com o modelo de visão (ex.: API Claude com imagem,
 * ou modelo próprio treinado em pratos moçambicanos).
 *
 * Por agora devolve um resultado simulado para permitir testar o fluxo de UI.
 */
export async function recognizeFood(_photoUri: string): Promise<RecognitionResult> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const food = FOODS[Math.floor(Math.random() * FOODS.length)];
  return { food, confidence: 0.5 };
}
