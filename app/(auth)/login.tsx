import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Link, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { getSupportedBiometricTypes } from '@/hooks/useBiometrics';

export default function LoginScreen() {
  const { status, signIn, unlockWithBiometrics, biometricsAvailable } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [biometricLabel, setBiometricLabel] = useState('Biometrics');
  const passwordRef = useRef<TextInput>(null);

  React.useEffect(() => {
    getSupportedBiometricTypes().then(setBiometricLabel);
  }, []);

  if (status === 'authenticated') return <Redirect href="/(app)/home" />;

  const handleSignIn = useCallback(async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    try {
      setLoading(true);
      await signIn(email.trim().toLowerCase(), password);
    } catch (err: any) {
      Alert.alert('Sign in failed', err?.message ?? 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, [email, password, signIn]);

  const handleBiometricUnlock = useCallback(async () => {
    const success = await unlockWithBiometrics();
    if (!success) {
      Alert.alert('Authentication failed', 'Biometric verification was unsuccessful.');
    }
  }, [unlockWithBiometrics]);

  // Show biometric unlock when session is locked
  const showBiometricUnlock = status === 'locked' && biometricsAvailable;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.brand}>EarlyOn</Text>
            <Text style={styles.title}>
              {showBiometricUnlock ? 'Welcome back' : 'Sign in'}
            </Text>
            <Text style={styles.subtitle}>
              {showBiometricUnlock
                ? 'Use biometrics or enter your password to continue'
                : 'Enter your credentials to continue'}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {showBiometricUnlock && (
              <Button
                label={`Sign in with ${biometricLabel}`}
                variant="secondary"
                onPress={handleBiometricUnlock}
              />
            )}

            {showBiometricUnlock && (
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerLabel}>or use password</Text>
                <View style={styles.dividerLine} />
              </View>
            )}

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />

            <Input
              ref={passwordRef}
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              textContentType="password"
              autoComplete="current-password"
              returnKeyType="done"
              onSubmitEditing={handleSignIn}
              rightIcon={
                <Text style={styles.showToggle}>{showPassword ? 'Hide' : 'Show'}</Text>
              }
              onRightIconPress={() => setShowPassword((v) => !v)}
            />

            <Pressable style={styles.forgotRow}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>

            <Button label="Sign In" onPress={handleSignIn} loading={loading} />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/(auth)/register" asChild>
              <Pressable>
                <Text style={styles.footerLink}>Sign Up</Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  brand: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primaryDark,
    letterSpacing: 0.5,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  showToggle: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -4,
  },
  forgotText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  footerLink: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
  },
});
