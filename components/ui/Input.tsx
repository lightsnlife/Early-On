import React, { forwardRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';
import { palette } from '../ui/tokens';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, rightIcon, onRightIconPress, style, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View
          style={[
            styles.inputWrapper,
            focused && styles.inputWrapperFocused,
            !!error && styles.inputWrapperError,
          ]}
        >
          <TextInput
            ref={ref}
            style={[styles.input, style]}
            placeholderTextColor={palette.soft}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoCapitalize="none"
            {...props}
          />
          {rightIcon && (
            <Pressable onPress={onRightIconPress} style={styles.rightIcon} hitSlop={8}>
              {rightIcon}
            </Pressable>
          )}
        </View>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';
export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: 'NunitoSans-SemiBold',
    color: palette.mid,
    marginBottom: 7,
    letterSpacing: 0.2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(139,117,212,0.18)',
    borderRadius: 14,
    backgroundColor: palette.cardBg,
    paddingHorizontal: 14,
  },
  inputWrapperFocused: {
    borderColor: palette.rose400,
    shadowColor: palette.rose500,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  inputWrapperError: {
    borderColor: palette.rose600,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'NunitoSans-Regular',
    color: palette.dark,
    paddingVertical: 13,
  },
  rightIcon: {
    paddingLeft: 8,
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: 'NunitoSans-Regular',
    color: palette.rose600,
  },
});
