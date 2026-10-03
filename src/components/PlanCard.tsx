import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow } from '@/constants/theme';
import type { Plan } from '@/constants/business';

interface Props {
  plan: Plan;
  selected: boolean;
  onPress: () => void;
}

export function PlanCard({ plan, selected, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.selected]}>
      {plan.badge && (
        <View style={[styles.badge, plan.id === 'yearly' && styles.badgeAlt]}>
          <Text style={styles.badgeText}>{plan.badge}</Text>
        </View>
      )}
      <View style={[styles.radio, selected && styles.radioOn]}>{selected && <View style={styles.radioDot} />}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{plan.title}</Text>
        <Text style={styles.sub}>Scans ilimitados</Text>
      </View>
      <Text style={styles.price}>
        {plan.priceMT} MT<Text style={styles.period}> {plan.period}</Text>
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 18,
    ...shadow,
  },
  selected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  badge: {
    position: 'absolute',
    top: -11,
    right: 18,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeAlt: { backgroundColor: '#FF9800' },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.muted, alignItems: 'center', justifyContent: 'center' },
  radioOn: { borderColor: colors.primary },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  title: { fontSize: 17, fontWeight: '800', color: colors.text },
  sub: { fontSize: 12, color: colors.muted, marginTop: 2 },
  price: { fontSize: 18, fontWeight: '800', color: colors.text },
  period: { fontSize: 12, fontWeight: '500', color: colors.muted },
});
