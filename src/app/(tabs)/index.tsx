import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MealCard } from '@/components/MealCard';
import { SearchBar } from '@/components/SearchBar';
import { colors, radius } from '@/constants/theme';
import { useMeals } from '@/hooks/useMeals';
import { useTrial } from '@/hooks/useTrial';
import { analysisFromCatalog, findDish } from '@/services/foodCatalog';
import type { Meal } from '@/types';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { todayMeals } = useMeals();
  const { status } = useTrial();

  const openMeal = (meal: Meal) =>
    router.push({
      pathname: '/details',
      params: { analysis: JSON.stringify(meal), photoUri: meal.photoUri ?? '', mealId: meal.id },
    });

  const onSearch = (query: string) => {
    const dish = findDish(query);
    if (!dish) {
      Alert.alert('Alimento não encontrado', 'Tente: xima, matapa, mucapata, cacana, badjias, caril de caranguejo...');
      return;
    }
    router.push({ pathname: '/details', params: { analysis: JSON.stringify(analysisFromCatalog(dish)), photoUri: '' } });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 24, paddingHorizontal: 20, paddingBottom: 120, gap: 22 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ gap: 6 }}>
        <Text style={styles.brand}>Nutriftness IA</Text>
        <Text style={styles.hello}>Let's Check Your Meal Together</Text>
      </View>

      <SearchBar onSubmit={onSearch} />

      {status.kind === 'trial' && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Teste grátis: {status.daysLeft} dia(s) restante(s) · {status.scansLeft} scan(s) hoje
          </Text>
        </View>
      )}

      <Text style={styles.section}>Last Scans</Text>
      {todayMeals.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Ainda não há refeições hoje. Toque na câmera para escanear o seu prato.</Text>
        </View>
      ) : (
        <View style={{ gap: 14 }}>
          {todayMeals.map((m) => (
            <MealCard key={m.id} meal={m} onPress={() => openMeal(m)} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  brand: { fontSize: 14, fontWeight: '700', color: colors.primary, letterSpacing: 0.5 },
  hello: { fontSize: 32, fontWeight: '800', color: colors.text, lineHeight: 38 },
  banner: { backgroundColor: colors.primarySoft, borderRadius: radius.md, padding: 14 },
  bannerText: { color: colors.primaryDark, fontWeight: '600', fontSize: 13 },
  section: { fontSize: 20, fontWeight: '800', color: colors.text },
  empty: { backgroundColor: colors.card, borderRadius: radius.lg, padding: 22 },
  emptyText: { color: colors.muted, lineHeight: 20 },
});
