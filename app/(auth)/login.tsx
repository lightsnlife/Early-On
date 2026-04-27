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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { palette } from '@/components/ui/tokens';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const { status, signIn } = useAuth();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<TextInput>(null);

  // All hooks must be declared before any conditional return
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

  if (status === 'authenticated') return <Redirect href="/(app)/home" />;

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: palette.pageBg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 32 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.brand}>
            early<Text style={styles.brandAccent}>on</Text>
          </Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey</Text>
        </View>

        <View style={styles.form}>
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
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  brand: {
    fontSize: 36,
    fontFamily: 'Nunito-Black',
    color: palette.dark,
    letterSpacing: -0.5,
    marginBottom: 28,
  },
  brandAccent: {
    color: palette.rose500,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Nunito-ExtraBold',
    color: palette.dark,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'NunitoSans-Regular',
    color: palette.mid,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  showToggle: {
    fontSize: 14,
    fontFamily: 'NunitoSans-SemiBold',
    color: palette.rose500,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -4,
  },
  forgotText: {
    fontSize: 14,
    fontFamily: 'NunitoSans-SemiBold',
    color: palette.rose500,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 36,
  },
  footerText: {
    fontSize: 15,
    fontFamily: 'NunitoSans-Regular',
    color: palette.mid,
  },
  footerLink: {
    fontSize: 15,
    fontFamily: 'NunitoSans-SemiBold',
    color: palette.rose500,
  },
});
