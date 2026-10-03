import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';
import { colors } from '@/constants/theme';
import type { Ingredient } from '@/types';

interface Props {
  ingredients: Ingredient[];
  calories: number;
  size?: number;
}

/**
 * Gráfico em "flor": cada ingrediente é uma pétala. O ângulo segue a sua fatia
 * acumulada (0–100%) e o comprimento/largura crescem com a percentagem.
 */
export function PetalChart({ ingredients, calories, size = 300 }: Props) {
  const c = size / 2;
  const hole = size * 0.13;
  const maxLen = size / 2 - 8;
  const maxPct = Math.max(...ingredients.map((i) => i.percent), 1);

  // Pétalas igualmente espaçadas (flor); o tamanho de cada uma reflete a sua percentagem.
  const step = 360 / Math.max(ingredients.length, 1);
  const petals = ingredients.map((ing, idx) => {
    const mid = idx * step;
    const len = maxLen * (0.5 + 0.5 * (ing.percent / maxPct));
    const w = len * Math.min(0.42, (step / 360) * 1.6);
    const rad = ((mid - 90) * Math.PI) / 180;
    const labelR = len * 0.62;
    return { ing, mid, len, w, lx: c + labelR * Math.cos(rad), ly: c + labelR * Math.sin(rad) };
  });

  return (
    <View style={styles.wrap}>
      <Svg width={size} height={size}>
        {petals.map(({ ing, mid, len, w }) => {
          const d = `M0 0 C ${-w} ${-len * 0.2}, ${-w} ${-len * 0.9}, 0 ${-len} C ${w} ${-len * 0.9}, ${w} ${-len * 0.2}, 0 0 Z`;
          return (
            <G key={ing.name} transform={`translate(${c} ${c}) rotate(${mid})`}>
              <Path d={d} fill={ing.color} fillOpacity={0.92} stroke="#FFFFFF" strokeWidth={3} strokeLinejoin="round" />
            </G>
          );
        })}
        <Circle cx={c} cy={c} r={hole + 4} fill="#FFFFFF" />
        <SvgText x={c} y={c + 2} fontFamily="System" fontSize={size * 0.065} fontWeight="800" fill={colors.text} textAnchor="middle">
          {calories}
        </SvgText>
        <SvgText x={c} y={c + size * 0.06} fontSize={size * 0.036} fill={colors.muted} textAnchor="middle">
          kcal
        </SvgText>
        {petals.map(({ ing, lx, ly }) =>
          ing.percent >= 5 ? (
            <SvgText
              key={`t-${ing.name}`}
              x={lx}
              y={ly + 4}
              fontSize={size * 0.04}
              fontWeight="700"
              fill="#FFFFFF"
              textAnchor="middle"
            >
              {`${ing.percent}%`}
            </SvgText>
          ) : null,
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { alignItems: 'center', justifyContent: 'center' } });
