import { useMemo, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IngredientRow } from '@/components/IngredientRow';
import { MacroCard } from '@/components/MacroCard';
import { macroPercents } from '@/components/MealCard';
import { PetalChart } from '@/components/PetalChart';
import { colors, radius, shadow } from '@/constants/theme';
import { saveMeal } from '@/hooks/useMeals';
import { deriveIngredients } from '@/services/foodCatalog';
import { parseAnalysis } from '@/services/foodRecognition';
import type { FoodAnalysis, Meal } from '@/types';

export default function DetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ analysis?: string; photoUri?: string; mealId?: string; offline?: string }>();
  const [saved, setSaved] = useState(false);

  const data = useMemo<FoodAnalysis | null>(() => {
    try {
      return params.analysis ? parseAnalysis(JSON.parse(params.analysis)) : null;
    } catch {
      return null;
    }
  }, [params.analysis]);

  const ingredients = useMemo(() => (data ? deriveIngredients(data) : []), [data]);
  // id estável durante a vida do ecrã, para "Salvar" não duplicar.
  const mealId = useMemo(() => params.mealId || `${Date.now()}`, [params.mealId]);

  if (!data) {
    return (
      <View style={[styles.screen, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={styles.sub}>Dados da refeição indisponíveis.</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: colors.primary, fontWeight: '700', marginTop: 12 }}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  const pct = macroPercents(data);
  const photoUri = params.photoUri || undefined;

  const onSave = async () => {
    const meal: Meal = { ...data, id: mealId, createdAt: new Date().toISOString(), photoUri, ingredients };
    await saveMeal(meal);
    setSaved(true);
    Alert.alert('Salvo', 'Refeição adicionada ao seu diário.', [{ text: 'OK', onPress: () => router.replace('/') }]);
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 20, paddingBottom: 40, gap: 20 }}>
        <View style={styles.topRow}>
          <Pressable style={styles.back} onPress={() => router.back()} accessibilityLabel="Voltar">
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </Pressable>
          {photoUri && <Image source={{ uri: photoUri }} style={styles.thumb} />}
        </View>

        <View style={{ gap: 4 }}>
          <Text style={styles.title}>
            {data.food_name} - {data.estimated_weight_grams}g
          </Text>
          <Text style={styles.sub}>Peso estimado pela IA · {data.calories} kcal</Text>
          {params.offline ? (
            <Text style={styles.offline}>Sem ligação à IA: a mostrar uma estimativa de exemplo.</Text>
          ) : null}
        </View>

        <View style={styles.chartCard}>
          <PetalChart ingredients={ingredients} calories={data.calories} />
          <View style={styles.legend}>
            {ingredients.map((i) => (
              <View key={i.name} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: i.color }]} />
                <Text style={styles.legendText}>
                  {i.name.split(' (')[0]} {i.percent}%
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.macros}>
          <MacroCard label="Carboidratos" percent={pct.carbs} grams={data.carbs_g} color={colors.carbs} />
          <MacroCard label="Proteínas" percent={pct.protein} grams={data.protein_g} color={colors.protein} />
          <MacroCard label="Gorduras" percent={pct.fats} grams={data.fats_g} color={colors.fats} />
        </View>

        <View style={styles.listCard}>
          <Text style={styles.listTitle}>Ingredientes</Text>
          {ingredients.map((i) => (
            <IngredientRow key={i.name} item={i} />
          ))}
        </View>

        <Pressable style={[styles.save, saved && { opacity: 0.6 }]} onPress={onSave} disabled={saved}>
          <Text style={styles.saveText}>Salvar no meu Diário</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  back: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', ...shadow },
  thumb: { width: 42, height: 42, borderRadius: 21 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text },
  sub: { fontSize: 14, color: colors.muted },
  offline: { fontSize: 12, color: '#E65100', marginTop: 4 },
  chartCard: { backgroundColor: colors.card, borderRadius: radius.lg, paddingVertical: 20, alignItems: 'center', gap: 12, ...shadow },
  legend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, paddingHorizontal: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, color: colors.text },
  macros: { flexDirection: 'row', gap: 12 },
  listCard: { backgroundColor: colors.card, borderRadius: radius.lg, paddingHorizontal: 18, paddingVertical: 14, ...shadow },
  listTitle: { fontSize: 17, fontWeight: '800', color: colors.text, marginBottom: 4 },
  save: { backgroundColor: colors.primary, borderRadius: radius.pill, paddingVertical: 17, alignItems: 'center', ...shadow },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
