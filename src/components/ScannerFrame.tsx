import { StyleSheet, View } from 'react-native';
import { colors } from '@/constants/theme';

const SIZE = 280;
const CORNER = 56;
const GREEN = '#69F0AE';

/** Quadrado central com cantos arredondados e guias verdes brilhantes. */
export function ScannerFrame() {
  return (
    <View pointerEvents="none" style={styles.frame}>
      <View style={[styles.corner, styles.tl]} />
      <View style={[styles.corner, styles.tr]} />
      <View style={[styles.corner, styles.bl]} />
      <View style={[styles.corner, styles.br]} />
    </View>
  );
}

const common = { borderColor: GREEN, width: CORNER, height: CORNER, position: 'absolute' as const };

const styles = StyleSheet.create({
  frame: {
    width: SIZE,
    height: SIZE,
    borderRadius: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  corner: { ...common, shadowColor: colors.primary, shadowOpacity: 0.9, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
  tl: { top: -2, left: -2, borderTopWidth: 5, borderLeftWidth: 5, borderTopLeftRadius: 44 },
  tr: { top: -2, right: -2, borderTopWidth: 5, borderRightWidth: 5, borderTopRightRadius: 44 },
  bl: { bottom: -2, left: -2, borderBottomWidth: 5, borderLeftWidth: 5, borderBottomLeftRadius: 44 },
  br: { bottom: -2, right: -2, borderBottomWidth: 5, borderRightWidth: 5, borderBottomRightRadius: 44 },
});
