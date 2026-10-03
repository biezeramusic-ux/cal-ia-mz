import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, shadow } from '@/constants/theme';
import type { Meal } from '@/types';

interface Props {
  meal: Meal;
  onPress: () => void;
}

function Dot({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.dotWrap}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.dotText}>{label}</Text>
    </View>
  );
}

/** Percentagem de cada macro nas calorias do prato (4/4/9 kcal por grama). */
export function macroPercents(m: { carbs_g: number; protein_g: number; fats_g: number }) {
  const c = m.carbs_g * 4;
  const p = m.protein_g * 4;
  const f = m.fats_g * 9;
  const total = c + p + f || 1;
  return {
    carbs: Math.round((c / total) * 100),
    protein: Math.round((p / total) * 100),
    fats: Math.round((f / total) * 100),
  };
}

export function MealCard({ meal, onPress }: Props) {
  const pct = macroPercents(meal);
  return (
    <Pressable onPress={onPress} style={styles.card}>
      {meal.photoUri ? (
        <Image source={{ uri: meal.photoUri }} style={styles.photo} />
      ) : (
        <View style={[styles.photo, styles.photoFallback]}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={30} color={colors.primary} />
        </View>
      )}
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {meal.food_name}
        </Text>
        <Text style={styles.sub}>
          {meal.estimated_weight_grams} g · {meal.calories} kcal
        </Text>
        <View style={styles.dots}>
          <Dot color={colors.carbs} label={`${pct.carbs}%`} />
          <Dot color={colors.protein} label={`${pct.protein}%`} />
          <Dot color={colors.fats} label={`${pct.fats}%`} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 14,
    gap: 14,
    ...shadow,
  },
  photo: { width: 72, height: 72, borderRadius: 36 },
  photoFallback: { backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1, gap: 4 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  sub: { fontSize: 13, color: colors.muted },
  dots: { flexDirection: 'row', gap: 12, marginTop: 6 },
  dotWrap: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  dotText: { fontSize: 12, fontWeight: '600', color: colors.text },
});
