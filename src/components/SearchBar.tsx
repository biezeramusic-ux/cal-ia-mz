import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '@/constants/theme';

interface Props {
  onSubmit: (query: string) => void;
}

export function SearchBar({ onSubmit }: Props) {
  const [value, setValue] = useState('');
  return (
    <View style={styles.wrap}>
      <Ionicons name="search" size={20} color={colors.muted} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="Pesquisar alimento (ex: xima, matapa)"
        placeholderTextColor={colors.muted}
        returnKeyType="search"
        onSubmitEditing={() => {
          onSubmit(value);
          setValue('');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.pill,
    paddingHorizontal: 20,
    height: 56,
    gap: 10,
    ...shadow,
  },
  input: { flex: 1, fontSize: 15, color: colors.text },
});
