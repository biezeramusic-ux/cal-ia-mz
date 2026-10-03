import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, DAILY_KCAL_GOAL } from '../constants/theme';

export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.text}>Meta diária: {DAILY_KCAL_GOAL} kcal</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 16, color: colors.text },
  text: { color: colors.muted },
});
