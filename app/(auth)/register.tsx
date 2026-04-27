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

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function validate(
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string
): FormErrors {
  const errors: FormErrors = {};
  if (!fullName.trim()) errors.fullName = 'Full name is required';
  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
}

export default function RegisterScreen() {
  const { status, signUp } = useAuth();
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  // All hooks must be declared before any conditional return
  const handleRegister = useCallback(async () => {
    const validationErrors = validate(fullName, email, password, confirmPassword);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      await signUp(email.trim().toLowerCase(), password, fullName.trim());
      Alert.alert(
        'Check your email',
        'We sent a confirmation link to your email. Please verify your address before signing in.',
        [{ text: 'OK' }]
      );
    } catch (err: any) {
      Alert.alert('Registration failed', err?.message ?? 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, [fullName, email, password, confirmPassword, signUp]);

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
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Join EarlyOn to get started</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={fullName}
            onChangeText={(v) => {
              setFullName(v);
              if (errors.fullName) setErrors((e) => ({ ...e, fullName: undefined }));
            }}
            placeholder="Jane Smith"
            textContentType="name"
            autoComplete="name"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            error={errors.fullName}
          />

          <Input
            ref={emailRef}
            label="Email"
            value={email}
            onChangeText={(v) => {
              setEmail(v);
              if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
            }}
            placeholder="you@example.com"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            error={errors.email}
          />

          <Input
            ref={passwordRef}
            label="Password"
            value={password}
            onChangeText={(v) => {
              setPassword(v);
              if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
            }}
            placeholder="At least 8 characters"
            secureTextEntry={!showPassword}
            textContentType="newPassword"
            autoComplete="new-password"
            returnKeyType="next"
            onSubmitEditing={() => confirmRef.current?.focus()}
            rightIcon={
              <Text style={styles.showToggle}>{showPassword ? 'Hide' : 'Show'}</Text>
            }
            onRightIconPress={() => setShowPassword((v) => !v)}
            error={errors.password}
          />

          <Input
            ref={confirmRef}
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(v) => {
              setConfirmPassword(v);
              if (errors.confirmPassword)
                setErrors((e) => ({ ...e, confirmPassword: undefined }));
            }}
            placeholder="Repeat your password"
            secureTextEntry={!showConfirm}
            textContentType="newPassword"
            returnKeyType="done"
            onSubmitEditing={handleRegister}
            rightIcon={
              <Text style={styles.showToggle}>{showConfirm ? 'Hide' : 'Show'}</Text>
            }
            onRightIconPress={() => setShowConfirm((v) => !v)}
            error={errors.confirmPassword}
          />

          <Button label="Create Account" onPress={handleRegister} loading={loading} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <Pressable>
              <Text style={styles.footerLink}>Sign In</Text>
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
    marginBottom: 36,
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
  },
  form: {
    flex: 1,
  },
  showToggle: {
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
