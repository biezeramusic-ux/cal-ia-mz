import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, DAILY_KCAL_GOAL } from '../constants/theme';

type Props = {
  kcal: number;
  totals: { proteinG: number; carbsG: number; fatG: number };
};

export function CalorieSummary({ kcal, totals }: Props) {
  const remaining = Math.max(DAILY_KCAL_GOAL - kcal, 0);
  return (
    <View style={styles.card}>
      <Text style={styles.big}>{remaining}</Text>
      <Text style={styles.label}>kcal restantes</Text>
      <View style={styles.row}>
        <Macro label="Proteína" value={totals.proteinG} color={colors.protein} />
        <Macro label="Hidratos" value={totals.carbsG} color={colors.carbs} />
        <Macro label="Gordura" value={totals.fatG} color={colors.fat} />
      </View>
    </View>
  );
}

function Macro({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.macro}>
      <Text style={[styles.macroValue, { color }]}>{Math.round(value)}g</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 20, padding: 20, alignItems: 'center' },
  big: { fontSize: 48, fontWeight: '800', color: colors.text },
  label: { color: colors.muted, fontSize: 13 },
  row: { flexDirection: 'row', marginTop: 16, alignSelf: 'stretch', justifyContent: 'space-around' },
  macro: { alignItems: 'center' },
  macroValue: { fontSize: 18, fontWeight: '700' },
});
