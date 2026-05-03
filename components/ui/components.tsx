/**
 * EarlyOn Shared UI Components
 *
 * Primitive, styled components that enforce the design system.
 * Import these instead of raw React Native primitives to keep
 * the visual language consistent across every screen.
 *
 * Components:
 *   EText        — typed text with semantic variants
 *   EButton      — primary / ghost / icon button
 *   ECard        — surface card with consistent shadow + rounding
 *   EChip        — small category/age chip
 *   CategoryCard — home screen category grid card
 *   EAvatar      — child avatar pill/circle
 *   Divider      — hairline separator
 */

import React from 'react';
import { cardColors, type CardColorKey } from '@/constants/colors';
import { getMenuIcon } from '@/constants/iconRegistry';
import EmojiIcon from '@/components/ui/EmojiIcon';
import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../assets/theme';

// ─── EText ──────────────────────────────────────────────────────────────────
type TextVariant =
  | 'display'    // 48px / black  — hero / app name
  | 'h1'         // 32px / black  — screen titles
  | 'h2'         // 26px / extrabold
  | 'h3'         // 22px / bold
  | 'h4'         // 18px / bold
  | 'bodyLg'     // 16px / regular
  | 'body'       // 14px / regular
  | 'bodySm'     // 13px / regular
  | 'label'      // 12px / semibold — labels, caps
  | 'labelSm'    // 11px / semibold
  | 'caption'    // 10px / medium
  | 'button'     // 17px / extrabold — CTA text
  | 'buttonSm';  // 15px / bold

interface ETextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
  uppercase?: boolean;
}

const textVariantStyles: Record<TextVariant, object> = {
  display:  { fontSize: 48, fontFamily: 'Nunito-Black',     letterSpacing: -1.5, lineHeight: 52 },
  h1:       { fontSize: 32, fontFamily: 'Nunito-ExtraBold', letterSpacing: -0.8, lineHeight: 38 },
  h2:       { fontSize: 26, fontFamily: 'Nunito-ExtraBold', letterSpacing: -0.5, lineHeight: 32 },
  h3:       { fontSize: 22, fontFamily: 'Nunito-Bold',      letterSpacing: -0.3, lineHeight: 28 },
  h4:       { fontSize: 18, fontFamily: 'Nunito-Bold',      lineHeight: 24 },
  bodyLg:   { fontSize: 16, fontFamily: 'NunitoSans-Regular', lineHeight: 26 },
  body:     { fontSize: 14, fontFamily: 'NunitoSans-Regular', lineHeight: 22 },
  bodySm:   { fontSize: 13, fontFamily: 'NunitoSans-Regular', lineHeight: 20 },
  label:    { fontSize: 12, fontFamily: 'NunitoSans-SemiBold', letterSpacing: 0.3 },
  labelSm:  { fontSize: 11, fontFamily: 'NunitoSans-SemiBold', letterSpacing: 0.5 },
  caption:  { fontSize: 10, fontFamily: 'NunitoSans-Medium',  letterSpacing: 0.3 },
  button:   { fontSize: 17, fontFamily: 'Nunito-ExtraBold',   letterSpacing: 0.2 },
  buttonSm: { fontSize: 15, fontFamily: 'Nunito-Bold',        letterSpacing: 0.1 },
};

export function EText({
  variant = 'body',
  color,
  align = 'left',
  uppercase = false,
  style,
  children,
  ...props
}: ETextProps) {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        textVariantStyles[variant],
        { color: color ?? colors.textPrimary, textAlign: align },
        uppercase && { textTransform: 'uppercase' },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

// ─── EButton ────────────────────────────────────────────────────────────────
type ButtonVariant = 'primary' | 'ghost' | 'soft';

interface EButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  label: string;
  loading?: boolean;
  fullWidth?: boolean;
}

export function EButton({
  variant = 'primary',
  label,
  loading = false,
  fullWidth = true,
  style,
  disabled,
  ...props
}: EButtonProps) {
  const { colors, shadows, radii } = useTheme();

  const variantStyle = {
    primary: {
      backgroundColor: colors.brandPrimary,
      ...shadows.brand,
    },
    ghost: {
      backgroundColor: 'rgba(255,255,255,0.72)',
      borderWidth: 1.5,
      borderColor: 'rgba(139,117,212,0.18)',
    },
    soft: {
      backgroundColor: cardColors.lavender.bg,
    },
  }[variant] as object;

  const labelColor = {
    primary: '#FFFFFF',
    ghost:   colors.textSecondary,
    soft:    colors.brandSecondary,
  }[variant];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.buttonBase,
        { borderRadius: radii.lg },
        fullWidth && { width: '100%' },
        variantStyle,
        disabled && { opacity: 0.5 },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={labelColor} />
      ) : (
        <EText variant="button" color={labelColor} align="center">
          {label}
        </EText>
      )}
    </TouchableOpacity>
  );
}

// ─── ECard ──────────────────────────────────────────────────────────────────
interface ECardProps extends ViewProps {
  padding?: number;
  shadow?: 'xs' | 'sm' | 'md' | 'lg';
}

export function ECard({
  padding,
  shadow = 'sm',
  style,
  children,
  ...props
}: ECardProps) {
  const { colors, spacing, radii, shadows } = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.backgroundCard,
          borderRadius: radii.xl,
          padding: padding ?? spacing[4],
          borderColor: colors.border,
          ...shadows[shadow],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

// ─── EChip ──────────────────────────────────────────────────────────────────
type ChipColor = CardColorKey;

interface EChipProps {
  label: string;
  color?: ChipColor;
  bgColor?: string;
  textColor?: string;
  size?: 'sm' | 'md';
  onPress?: () => void;
  selected?: boolean;
}

export function EChip({ label, color = 'lavender', bgColor, textColor, size = 'md', onPress, selected }: EChipProps) {
  const { radii } = useTheme();
  const { bg, text } = cardColors[color];
  const resolvedBg   = bgColor   ?? bg;
  const resolvedText = textColor ?? text;

  const chipStyle = {
    backgroundColor: resolvedBg,
    borderRadius: radii.full,
    paddingHorizontal: size === 'sm' ? 10 : 14,
    paddingVertical:   size === 'sm' ?  4 :  6,
    alignSelf: 'flex-start' as const,
    transform: selected ? [{ scale: 1.25 }] : undefined,
  };

  const content = (
    <EText variant={size === 'sm' ? 'labelSm' : 'label'} color={resolvedText}>
      {label}
    </EText>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.75} onPress={onPress} style={chipStyle}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={chipStyle}>{content}</View>;
}

// ─── CategoryCard ───────────────────────────────────────────────────────────
type CategoryColor = ChipColor;

interface CategoryCardProps {
  icon: string;           // emoji or image element
  name: string;
  subtitle: string;
  color: CategoryColor;
  onPress?: () => void;
}

export function CategoryCard({
  icon,
  name,
  subtitle,
  color,
  onPress,
}: CategoryCardProps) {
  const { spacing, radii } = useTheme();
  const { bg } = cardColors[color];
  const emoji = getMenuIcon(icon);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        flex: 1,
        backgroundColor: bg,
        borderRadius: radii.xl,
        padding: spacing[4],
        gap: spacing[1.5],
      }}
    >
      <EmojiIcon emoji={emoji} size={28} />
      <EText variant="h4">{name}</EText>
      <EText variant="bodySm" color="#6B6380">{subtitle}</EText>
    </TouchableOpacity>
  );
}

// ─── Divider ────────────────────────────────────────────────────────────────
export function Divider({ style }: ViewProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
        style,
      ]}
    />
  );
}

// ─── Shared base styles ─────────────────────────────────────────────────────
const styles = StyleSheet.create({
  buttonBase: {
    paddingVertical: 17,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderWidth: 0.5,
  },
});
