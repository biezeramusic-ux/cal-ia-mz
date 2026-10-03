import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';
import { Meal } from '../types/food';

export function MealCard({ meal }: { meal: Meal }) {
  return (
    <View style={styles.card}>
      {meal.photoUri ? <Image source={{ uri: meal.photoUri }} style={styles.photo} /> : <View style={styles.photo} />}
      <View style={styles.info}>
        <Text style={styles.name}>{meal.food.name}</Text>
        <Text style={styles.sub}>{meal.portionG} g</Text>
      </View>
      <Text style={styles.kcal}>{meal.kcal} kcal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 16, padding: 12, marginBottom: 10 },
  photo: { width: 56, height: 56, borderRadius: 12, backgroundColor: '#DDD' },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: '600', color: colors.text },
  sub: { color: colors.muted, marginTop: 2 },
  kcal: { fontWeight: '700', color: colors.text },
});
