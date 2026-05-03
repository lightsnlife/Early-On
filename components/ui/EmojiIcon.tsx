import React from 'react';
import Svg, { Text as SvgText } from 'react-native-svg';

interface EmojiIconProps {
  emoji: string;
  size?: number;
}

export default function EmojiIcon({ emoji, size = 28 }: EmojiIconProps) {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <SvgText
        x={size / 2}
        y={size * 0.82}
        fontSize={size * 0.78}
        textAnchor="middle"
      >
        {emoji}
      </SvgText>
    </Svg>
  );
}
