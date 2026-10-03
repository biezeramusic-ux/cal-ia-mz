import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalorieSummary, MealCard } from '../components';
import { colors } from '../constants/theme';
import { useMeals } from '../hooks/useMeals';

export function HomeScreen() {
  const { meals, totalKcal, totals } = useMeals();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={meals}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Hoje</Text>
            <CalorieSummary kcal={totalKcal} totals={totals} />
            <Text style={styles.section}>Refeições</Text>
          </>
        }
        ListEmptyComponent={<Text style={styles.empty}>Ainda sem refeições. Use o scanner para adicionar xima, matapa e mais.</Text>}
        renderItem={({ item }) => <MealCard meal={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 20 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 16, color: colors.text },
  section: { fontSize: 18, fontWeight: '700', marginTop: 24, marginBottom: 12, color: colors.text },
  empty: { color: colors.muted },
});
