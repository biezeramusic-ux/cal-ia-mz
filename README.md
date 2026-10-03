# Nutriftness IA

App de contagem de calorias por foto, feito para Moçambique (Expo Router + TypeScript).

```bash
npm install
cp .env.example .env   # configure EXPO_PUBLIC_FOOD_API_URL
npx expo start
```

Sem `EXPO_PUBLIC_FOOD_API_URL` (ou se a rede falhar) o app usa o mock "Vegetable Salad".
Os pagamentos M-Pesa / e-Mola em `src/services/payments.ts` são um stub: ligue ao seu backend.
