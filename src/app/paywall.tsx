import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlanCard } from '@/components/PlanCard';
import { PLANS, type PlanId } from '@/constants/business';
import { colors, radius, shadow } from '@/constants/theme';
import { useTrial } from '@/hooks/useTrial';
import { requestPayment, type PaymentMethod } from '@/services/payments';

const PERKS = ['Scans de comida ilimitados', 'Sem restrições diárias', 'Histórico completo das refeições'];

export default function PaywallScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { activatePremium } = useTrial();
  const [selected, setSelected] = useState<PlanId>('monthly');
  const [phone, setPhone] = useState('');
  const [paying, setPaying] = useState<PaymentMethod | null>(null);

  const pay = async (method: PaymentMethod) => {
    const plan = PLANS.find((p) => p.id === selected);
    if (!plan || paying) return;
    setPaying(method);
    try {
      const res = await requestPayment({ method, plan, phone });
      if (!res.ok) return Alert.alert('Pagamento', res.message);
      await activatePremium(plan.id);
      Alert.alert('Bem-vindo ao Premium!', `Plano ${plan.title} ativo.`, [{ text: 'OK', onPress: () => router.back() }]);
    } finally {
      setPaying(null);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingTop: 24, paddingHorizontal: 20, paddingBottom: 24, gap: 18 }}>
        <Pressable style={styles.close} onPress={() => router.back()} accessibilityLabel="Fechar">
          <Ionicons name="close" size={22} color={colors.text} />
        </Pressable>

        <View style={{ alignItems: 'center', gap: 8 }}>
          <View style={styles.crown}>
            <Ionicons name="star" size={34} color="#fff" />
          </View>
          <Text style={styles.title}>Nutriftness IA Premium</Text>
          <Text style={styles.sub}>Escolha o seu plano e escaneie sem limites.</Text>
        </View>

        <View style={{ gap: 6 }}>
          {PERKS.map((p) => (
            <View key={p} style={styles.perk}>
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              <Text style={styles.perkText}>{p}</Text>
            </View>
          ))}
        </View>

        <View style={{ gap: 16, marginTop: 6 }}>
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} selected={selected === p.id} onPress={() => setSelected(p.id)} />
          ))}
        </View>

        <TextInput
          style={styles.phone}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="Número de telemóvel (ex: 84 123 4567)"
          placeholderTextColor={colors.muted}
        />
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 14 }]}>
        <Pressable style={[styles.pay, { backgroundColor: colors.mpesa }]} onPress={() => pay('mpesa')} disabled={!!paying}>
          {paying === 'mpesa' ? <ActivityIndicator color="#fff" /> : <Text style={styles.payText}>Pagar via M-Pesa</Text>}
        </Pressable>
        <Pressable style={[styles.pay, { backgroundColor: colors.emola }]} onPress={() => pay('emola')} disabled={!!paying}>
          {paying === 'emola' ? <ActivityIndicator color="#fff" /> : <Text style={styles.payText}>Pagar via e-Mola</Text>}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  close: { alignSelf: 'flex-end', width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', ...shadow },
  crown: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', ...shadow },
  title: { fontSize: 26, fontWeight: '800', color: colors.text },
  sub: { fontSize: 14, color: colors.muted, textAlign: 'center' },
  perk: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  perkText: { fontSize: 15, color: colors.text },
  phone: { backgroundColor: colors.card, borderRadius: radius.pill, paddingHorizontal: 20, height: 52, fontSize: 15, color: colors.text, ...shadow },
  footer: { paddingHorizontal: 20, paddingTop: 12, gap: 10, backgroundColor: colors.card, borderTopLeftRadius: 28, borderTopRightRadius: 28, ...shadow },
  pay: { height: 56, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  payText: { color: '#fff', fontSize: 17, fontWeight: '800' },
});
