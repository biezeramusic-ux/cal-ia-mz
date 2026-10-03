import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MealCard } from '../components';
import { colors } from '../constants/theme';
import { useMeals } from '../hooks/useMeals';

export function HistoryScreen() {
  const { meals } = useMeals();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={meals}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.title}>Histórico</Text>}
        ListEmptyComponent={<Text style={styles.empty}>Sem registos.</Text>}
        renderItem={({ item }) => <MealCard meal={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 20 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 16, color: colors.text },
  empty: { color: colors.muted },
});
