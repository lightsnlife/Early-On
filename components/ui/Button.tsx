import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  StyleProp,
  Text,
  ViewStyle,
  type PressableProps,
} from 'react-native';
import { palette } from '../ui/tokens';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  label: string;
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  label,
  variant = 'primary',
  loading = false,
  fullWidth = true,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'danger' ? '#fff' : palette.rose500} />
      ) : (
        <Text style={[styles.label, styles[`${variant}Label`]]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  fullWidth: { width: '100%' },
  pressed:  { opacity: 0.82, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.45 },

  primary: {
    backgroundColor: palette.rose500,
    shadowColor: palette.rose500,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  secondary: {
    backgroundColor: palette.lavender50,
    borderWidth: 1.5,
    borderColor: 'rgba(139,117,212,0.25)',
  },
  ghost: {
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1.5,
    borderColor: 'rgba(139,117,212,0.18)',
  },
  danger: {
    backgroundColor: palette.rose600,
  },

  label: {
    fontSize: 16,
    fontFamily: 'Nunito-ExtraBold',
    letterSpacing: 0.2,
  },
  primaryLabel:   { color: '#ffffff' },
  secondaryLabel: { color: palette.lavender400 },
  ghostLabel:     { color: palette.mid },
  dangerLabel:    { color: '#ffffff' },
});
