import * as ImageManipulator from 'expo-image-manipulator';

/** Limite para poupar megas do utilizador. */
export const MAX_BYTES = 300 * 1024;

// Tentativas da mais leve para a mais agressiva até caber em < 300KB.
const ATTEMPTS: { width: number; quality: number }[] = [
  { width: 640, quality: 0.5 },
  { width: 512, quality: 0.4 },
  { width: 400, quality: 0.35 },
  { width: 320, quality: 0.25 },
  { width: 240, quality: 0.2 },
];

const base64Bytes = (b64: string): number => Math.floor((b64.length * 3) / 4);

export interface CompressedImage {
  uri: string;
  base64: string;
  bytes: number;
}

/** Reduz resolução e qualidade da foto até o Base64 ficar abaixo de 300KB. */
export async function compressForUpload(uri: string): Promise<CompressedImage> {
  let last: CompressedImage | undefined;
  for (const { width, quality } of ATTEMPTS) {
    const out = await ImageManipulator.manipulateAsync(uri, [{ resize: { width } }], {
      compress: quality,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    });
    if (!out.base64) continue;
    last = { uri: out.uri, base64: out.base64, bytes: base64Bytes(out.base64) };
    if (last.bytes < MAX_BYTES) return last;
  }
  if (!last) throw new Error('Falha ao comprimir a imagem');
  return last;
}
