import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius } from '@/constants/theme';
import type { Ingredient } from '@/types';

export function IngredientRow({ item }: { item: Ingredient }) {
  return (
    <View style={styles.row}>
      <View style={[styles.icon, { backgroundColor: `${item.color}33` }]}>
        <MaterialCommunityIcons name={item.icon} size={22} color={item.color} />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.grams}>{item.grams} g</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  icon: { width: 40, height: 40, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  name: { flex: 1, fontSize: 15, color: colors.text, fontWeight: '500' },
  grams: { fontSize: 15, fontWeight: '700', color: colors.text },
});
