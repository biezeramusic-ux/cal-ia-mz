import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow } from '@/constants/theme';

interface Props {
  label: string;
  percent: number;
  grams: number;
  color: string;
}

export function MacroCard({ label, percent, grams, color }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.badge, { backgroundColor: color }]} />
      <Text style={styles.percent}>{percent}%</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.grams}>{grams} g</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    ...shadow,
  },
  badge: { width: 28, height: 6, borderRadius: 3, marginBottom: 6 },
  percent: { fontSize: 24, fontWeight: '800', color: colors.text },
  label: { fontSize: 12, fontWeight: '600', color: colors.text },
  grams: { fontSize: 12, color: colors.muted },
});
