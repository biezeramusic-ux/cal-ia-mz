import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '@/constants/theme';

interface Props {
  title: string;
  message: string;
  onUnlock: () => void;
}

/** Efeito de vidro fosco que congela a funcionalidade e abre o paywall. */
export function BlurLock({ title, message, onUnlock }: Props) {
  return (
    <BlurView intensity={55} tint="light" style={StyleSheet.absoluteFill}>
      <View style={styles.center}>
        <View style={styles.card}>
          <View style={styles.lock}>
            <Ionicons name="lock-closed" size={28} color={colors.primary} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.msg}>{message}</Text>
          <Pressable style={styles.btn} onPress={onUnlock}>
            <Text style={styles.btnText}>Ver planos Premium</Text>
          </Pressable>
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28 },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, padding: 24, alignItems: 'center', gap: 10, ...shadow },
  lock: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '800', color: colors.text, textAlign: 'center' },
  msg: { fontSize: 14, color: colors.muted, textAlign: 'center', lineHeight: 20 },
  btn: { marginTop: 8, backgroundColor: colors.primary, borderRadius: radius.pill, paddingVertical: 14, paddingHorizontal: 28 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
