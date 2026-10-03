import { useCallback, useRef, useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { recognizeFood } from '../services/foodRecognition';
import { RecognitionResult } from '../types/food';

export type ScanState =
  | { status: 'idle' }
  | { status: 'analyzing'; photoUri: string }
  | { status: 'done'; photoUri: string; result: RecognitionResult }
  | { status: 'error'; message: string };

export function useFoodScanner() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [state, setState] = useState<ScanState>({ status: 'idle' });

  const analyze = useCallback(async (photoUri: string) => {
    setState({ status: 'analyzing', photoUri });
    try {
      const result = await recognizeFood(photoUri);
      setState({ status: 'done', photoUri, result });
    } catch {
      setState({ status: 'error', message: 'Não foi possível analisar a foto.' });
    }
  }, []);

  const takePhoto = useCallback(async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.6 });
    if (photo?.uri) await analyze(photo.uri);
  }, [analyze]);

  const pickFromGallery = useCallback(async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.6,
    });
    if (!res.canceled) await analyze(res.assets[0].uri);
  }, [analyze]);

  const reset = useCallback(() => setState({ status: 'idle' }), []);

  return { cameraRef, permission, requestPermission, state, takePhoto, pickFromGallery, reset };
}
