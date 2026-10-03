import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, shadow } from '@/constants/theme';
import { useFasting } from '@/hooks/useFasting';
import { useWater } from '@/hooks/useWater';

const FAST_GOAL_SEC = 16 * 3600; // protocolo 16:8

const pad = (n: number) => String(n).padStart(2, '0');
const fmt = (s: number) => `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;

export default function TrackerScreen() {
  const insets = useSafeAreaInsets();
  const { glasses, goal, add, remove } = useWater();
  const fasting = useFasting();
  const fastPct = Math.min(100, Math.round((fasting.elapsedSec / FAST_GOAL_SEC) * 100));

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 24, paddingHorizontal: 20, paddingBottom: 120, gap: 20 }}
    >
      <Text style={styles.title}>Bónus</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💧 Hidratação</Text>
        <Text style={styles.sub}>Nos dias quentes de Moçambique, beba mais água!</Text>
        <View style={styles.waterRow}>
          <Pressable style={[styles.round, styles.minus]} onPress={remove} accessibilityLabel="Menos um copo">
            <Ionicons name="remove" size={28} color={colors.primary} />
          </Pressable>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.big}>
              {glasses}
              <Text style={styles.goal}> / {goal}</Text>
            </Text>
            <Text style={styles.sub}>copos (~{(glasses * 0.25).toFixed(2)} L)</Text>
          </View>
          <Pressable style={[styles.round, styles.plus]} onPress={add} accessibilityLabel="Mais um copo">
            <Ionicons name="add" size={28} color="#fff" />
          </Pressable>
        </View>
        <View style={styles.cups}>
          {Array.from({ length: goal }, (_, i) => (
            <Ionicons key={i} name={i < glasses ? 'water' : 'water-outline'} size={26} color={i < glasses ? '#29B6F6' : colors.border} />
          ))}
        </View>
        {glasses >= goal && <Text style={styles.done}>Meta atingida! 🎉</Text>}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>⏱️ Jejum Intermitente</Text>
        <Text style={styles.sub}>Protocolo 16:8 · meta de 16 horas</Text>
        <Text style={styles.timer}>{fmt(fasting.elapsedSec)}</Text>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${fastPct}%` }]} />
        </View>
        <Text style={styles.sub}>{fasting.running ? `${fastPct}% da meta` : 'Pronto para começar'}</Text>
        <Pressable
          style={[styles.action, fasting.running && { backgroundColor: '#EF5350' }]}
          onPress={fasting.running ? fasting.stop : fasting.start}
        >
          <Text style={styles.actionText}>{fasting.running ? 'Terminar jejum' : 'Iniciar jejum'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 32, fontWeight: '800', color: colors.text },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, padding: 22, gap: 12, ...shadow },
  cardTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  sub: { fontSize: 13, color: colors.muted },
  waterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 },
  round: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', ...shadow },
  minus: { backgroundColor: colors.primarySoft },
  plus: { backgroundColor: colors.primary },
  big: { fontSize: 44, fontWeight: '800', color: colors.text },
  goal: { fontSize: 20, color: colors.muted, fontWeight: '600' },
  cups: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 4 },
  done: { textAlign: 'center', color: colors.primaryDark, fontWeight: '700' },
  timer: { fontSize: 46, fontWeight: '800', color: colors.text, textAlign: 'center', fontVariant: ['tabular-nums'] },
  track: { height: 10, borderRadius: 5, backgroundColor: colors.border, overflow: 'hidden' },
  fill: { height: 10, backgroundColor: colors.primary, borderRadius: 5 },
  action: { backgroundColor: colors.primary, borderRadius: radius.pill, paddingVertical: 15, alignItems: 'center', marginTop: 4 },
  actionText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
