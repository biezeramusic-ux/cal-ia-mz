import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurLock } from '@/components/BlurLock';
import { ScannerFrame } from '@/components/ScannerFrame';
import { colors, radius } from '@/constants/theme';
import { useTrial } from '@/hooks/useTrial';
import { analyzeFood } from '@/services/foodRecognition';
import { compressForUpload } from '@/services/imageCompression';

export default function ScannerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const camera = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [busy, setBusy] = useState(false);
  const { status, registerScan } = useTrial();

  const blocked = status.kind === 'blocked';

  const process = async (uri: string) => {
    setBusy(true);
    try {
      // 1) comprime (< 300KB) antes de gastar megas; 2) envia à IA
      const small = await compressForUpload(uri);
      const { analysis, source } = await analyzeFood(small.base64);
      await registerScan();
      router.push({
        pathname: '/details',
        params: { analysis: JSON.stringify(analysis), photoUri: small.uri, offline: source === 'mock' ? '1' : '' },
      });
    } catch {
      Alert.alert('Erro', 'Não foi possível processar a imagem. Tente novamente.');
    } finally {
      setBusy(false);
    }
  };

  const capture = async () => {
    if (busy || !camera.current) return;
    if (blocked) return router.push('/paywall');
    const photo = await camera.current.takePictureAsync({ quality: 0.7, skipProcessing: true });
    if (photo) await process(photo.uri);
  };

  const pickFromGallery = async () => {
    if (busy) return;
    if (blocked) return router.push('/paywall');
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
    const asset = res.assets?.[0];
    if (!res.canceled && asset) await process(asset.uri);
  };

  if (!permission) return <View style={styles.dark} />;
  if (!permission.granted) {
    return (
      <View style={[styles.dark, styles.center, { padding: 32, gap: 16 }]}>
        <Ionicons name="camera-outline" size={56} color="#fff" />
        <Text style={styles.permText}>Precisamos da câmera para fotografar a sua refeição.</Text>
        <Pressable style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Permitir câmera</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.dark}>
      <CameraView ref={camera} style={StyleSheet.absoluteFill} facing="back" />
      <View style={[styles.center, StyleSheet.absoluteFill]} pointerEvents="none">
        <ScannerFrame />
        <Text style={styles.hint}>Enquadre o prato (xima, matapa, peixe...)</Text>
      </View>

      <View style={[styles.controls, { bottom: 110 }]}>
        <Pressable style={styles.side} onPress={pickFromGallery}>
          <Ionicons name="images" size={24} color="#fff" />
        </Pressable>
        <Pressable style={styles.shutterOuter} onPress={capture} disabled={busy}>
          <View style={styles.shutterInner} />
        </Pressable>
        <View style={styles.side} />
      </View>

      {busy && (
        <View style={[StyleSheet.absoluteFill, styles.center, styles.busy]}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.busyText}>A analisar o prato...</Text>
        </View>
      )}

      {blocked && (
        <View style={[StyleSheet.absoluteFill, { paddingTop: insets.top }]}>
          <BlurLock
            title={status.reason === 'daily_limit' ? 'Limite diário atingido' : 'Teste grátis terminou'}
            message={
              status.reason === 'daily_limit'
                ? 'Usou os 2 scans gratuitos de hoje. Assine para scans ilimitados.'
                : 'Os seus 3 dias grátis acabaram. Assine para continuar a escanear.'
            }
            onUnlock={() => router.push('/paywall')}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dark: { flex: 1, backgroundColor: '#000' },
  center: { alignItems: 'center', justifyContent: 'center' },
  hint: { color: '#fff', marginTop: 24, fontWeight: '600', backgroundColor: 'rgba(0,0,0,0.35)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill, overflow: 'hidden' },
  controls: { position: 'absolute', left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  side: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  shutterOuter: { width: 82, height: 82, borderRadius: 41, borderWidth: 5, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  shutterInner: { width: 62, height: 62, borderRadius: 31, backgroundColor: colors.primary },
  busy: { backgroundColor: 'rgba(0,0,0,0.6)', gap: 12 },
  busyText: { color: '#fff', fontWeight: '600' },
  permText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  permBtn: { backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 14, borderRadius: radius.pill },
  permBtnText: { color: '#fff', fontWeight: '700' },
});
