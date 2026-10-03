import type { Plan } from '@/constants/business';

export type PaymentMethod = 'mpesa' | 'emola';

export interface PaymentRequest {
  method: PaymentMethod;
  plan: Plan;
  phone: string;
}

/**
 * STUB: integre aqui o seu backend (Vodacom M-Pesa Mozambique API / Movitel e-Mola).
 * O backend deve disparar o pedido USSD push ao número e confirmar o pagamento.
 * Hoje apenas valida o número e simula sucesso.
 */
export async function requestPayment(req: PaymentRequest): Promise<{ ok: boolean; message: string }> {
  const digits = req.phone.replace(/\D/g, '').replace(/^258/, '');
  const prefixOk = req.method === 'mpesa' ? /^8[45]\d{7}$/ : /^8[67]\d{7}$/;
  if (!prefixOk.test(digits)) {
    return {
      ok: false,
      message:
        req.method === 'mpesa'
          ? 'Número M-Pesa inválido (84/85 + 7 dígitos).'
          : 'Número e-Mola inválido (86/87 + 7 dígitos).',
    };
  }
  await new Promise((r) => setTimeout(r, 1200));
  return { ok: true, message: 'Pagamento confirmado.' };
}
