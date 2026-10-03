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
  const hole = size * 0.15;
  const maxLen = size / 2 - hole - 6;
  const maxPct = Math.max(...ingredients.map((i) => i.percent), 1);
  const totalPct = ingredients.reduce((s, i) => s + i.percent, 0) || 1;

  let cum = 0;
  const petals = ingredients.map((ing) => {
    const share = (ing.percent / totalPct) * 100;
    const mid = ((cum + share / 2) / 100) * 360;
    cum += share;
    const len = maxLen * (0.55 + 0.45 * (ing.percent / maxPct));
    const arc = 2 * Math.PI * (hole + len / 2) * (share / 100);
    const w = Math.min(Math.max(arc * 0.5, 16), size * 0.17);
    const rad = ((mid - 90) * Math.PI) / 180;
    const labelR = hole + len * 0.58;
    return { ing, mid, len, w, lx: c + labelR * Math.cos(rad), ly: c + labelR * Math.sin(rad) };
  });

  return (
    <View style={styles.wrap}>
      <Svg width={size} height={size}>
        {petals.map(({ ing, mid, len, w }) => {
          const top = -(hole + len);
          const d = `M0 ${-hole} C ${-w * 1.2} ${-hole - len * 0.15}, ${-w * 1.2} ${top - len * 0.08}, 0 ${top} C ${w * 1.2} ${top - len * 0.08}, ${w * 1.2} ${-hole - len * 0.15}, 0 ${-hole} Z`;
          return (
            <G key={ing.name} transform={`translate(${c} ${c}) rotate(${mid})`}>
              <Path d={d} fill={ing.color} fillOpacity={0.9} stroke="#FFFFFF" strokeWidth={3} strokeLinejoin="round" />
            </G>
          );
        })}
        <Circle cx={c} cy={c} r={hole + 4} fill="#FFFFFF" />
        <SvgText x={c} y={c + 2} fontSize={size * 0.065} fontWeight="800" fill={colors.text} textAnchor="middle">
          {calories}
        </SvgText>
        <SvgText x={c} y={c + size * 0.06} fontSize={size * 0.036} fill={colors.muted} textAnchor="middle">
          kcal
        </SvgText>
        {petals.map(({ ing, lx, ly }) =>
          ing.percent >= 7 ? (
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
