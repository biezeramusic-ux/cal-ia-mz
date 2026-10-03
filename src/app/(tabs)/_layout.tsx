import { Pressable, StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadow } from '@/constants/theme';

function ScannerButton({ onPress, accessibilityState }: BottomTabBarButtonProps) {
  const focused = accessibilityState?.selected;
  return (
    <View style={styles.centerWrap}>
      <Pressable onPress={onPress} style={[styles.centerBtn, focused && styles.centerBtnOn]}>
        <Ionicons name="camera" size={30} color="#fff" />
      </Pressable>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarStyle: styles.bar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Início', tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
      />
      <Tabs.Screen name="scanner" options={{ title: '', tabBarButton: (p) => <ScannerButton {...p} /> }} />
      <Tabs.Screen
        name="tracker"
        options={{ title: 'Bónus', tabBarIcon: ({ color, size }) => <Ionicons name="water" size={size} color={color} /> }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 74,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: colors.card,
    borderTopWidth: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    ...shadow,
  },
  centerWrap: { flex: 1, alignItems: 'center' },
  centerBtn: {
    top: -26,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: colors.bg,
    ...shadow,
  },
  centerBtnOn: { backgroundColor: colors.primaryDark },
});
