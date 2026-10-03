# Cal IA MZ

Contador de calorias por foto para o mercado moçambicano (xima, matapa, feijão nhemba…). Expo + React Native + TypeScript.

## Estrutura

```
src/
  components/   UI reutilizável (CalorieSummary, MealCard, PermissionPrompt)
  screens/      Início, Scanner, Histórico, Perfil
  navigation/   Tabs (@react-navigation/bottom-tabs)
  services/     foodDatabase (pratos locais), foodRecognition (stub de IA), nutrition
  hooks/        useMeals (estado do diário), useFoodScanner (câmara + galeria)
  constants/    tema e meta calórica
  types/        tipos de domínio
```

## Bibliotecas base

- Navegação: `@react-navigation/native`, `@react-navigation/bottom-tabs`, `react-native-screens`, `react-native-safe-area-context`
- Câmara: `expo-camera`, `expo-image-picker`

## Correr

```bash
npm install
npx expo start
```

## Próximos passos

- Ligar `src/services/foodRecognition.ts` a um modelo de visão real.
- Persistir refeições (AsyncStorage/SQLite).
- Validar valores nutricionais em `foodDatabase.ts`.
