import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

export function PermissionPrompt({ onRequest }: { onRequest: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Precisamos da câmara para analisar o seu prato.</Text>
      <Pressable style={styles.button} onPress={onRequest}>
        <Text style={styles.buttonText}>Permitir câmara</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  text: { textAlign: 'center', fontSize: 16, color: colors.text, marginBottom: 16 },
  button: { backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 999 },
  buttonText: { color: '#FFF', fontWeight: '600' },
});
