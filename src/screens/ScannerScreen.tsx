import React from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { PermissionPrompt } from '../components';
import { colors } from '../constants/theme';
import { useFoodScanner } from '../hooks/useFoodScanner';
import { useMeals } from '../hooks/useMeals';
import { buildMeal } from '../services/nutrition';

export function ScannerScreen() {
  const navigation = useNavigation();
  const { addMeal } = useMeals();
  const { cameraRef, permission, requestPermission, state, takePhoto, pickFromGallery, reset } = useFoodScanner();

  if (!permission) return <View style={styles.container} />;
  if (!permission.granted) return <PermissionPrompt onRequest={requestPermission} />;

  if (state.status === 'analyzing') {
    return (
      <View style={styles.center}>
        <Image source={{ uri: state.photoUri }} style={styles.preview} />
        <ActivityIndicator size="large" style={{ marginTop: 24 }} />
        <Text style={styles.text}>A analisar o prato…</Text>
      </View>
    );
  }

  if (state.status === 'done') {
    const { food } = state.result;
    return (
      <View style={styles.center}>
        <Image source={{ uri: state.photoUri }} style={styles.preview} />
        <Text style={styles.title}>{food.name}</Text>
        <Text style={styles.text}>
          {food.description} · {food.defaultPortionG} g · {Math.round((food.kcalPer100g * food.defaultPortionG) / 100)} kcal
        </Text>
        <Pressable
          style={styles.primary}
          onPress={() => {
            addMeal(buildMeal(food, food.defaultPortionG, state.photoUri));
            reset();
            navigation.navigate('Início' as never);
          }}
        >
          <Text style={styles.primaryText}>Adicionar ao diário</Text>
        </Pressable>
        <Pressable onPress={reset}>
          <Text style={styles.link}>Tirar outra foto</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" />
      <View style={styles.controls}>
        <Pressable onPress={pickFromGallery}>
          <Text style={styles.controlText}>Galeria</Text>
        </Pressable>
        <Pressable style={styles.shutter} onPress={takePhoto} accessibilityLabel="Tirar foto" />
        <View style={{ width: 60 }} />
      </View>
      {state.status === 'error' && <Text style={styles.error}>{state.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: colors.background },
  preview: { width: 260, height: 260, borderRadius: 20 },
  title: { fontSize: 26, fontWeight: '800', marginTop: 20, color: colors.text },
  text: { color: colors.muted, marginTop: 8, textAlign: 'center' },
  primary: { backgroundColor: colors.primary, paddingHorizontal: 28, paddingVertical: 14, borderRadius: 999, marginTop: 24 },
  primaryText: { color: '#FFF', fontWeight: '700' },
  link: { color: colors.muted, marginTop: 16 },
  controls: { position: 'absolute', bottom: 40, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  controlText: { color: '#FFF', fontWeight: '600', width: 60 },
  shutter: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#FFF', borderWidth: 5, borderColor: 'rgba(255,255,255,0.5)' },
  error: { position: 'absolute', top: 60, alignSelf: 'center', color: '#FFF', backgroundColor: 'rgba(200,0,0,0.8)', padding: 8, borderRadius: 8 },
});
