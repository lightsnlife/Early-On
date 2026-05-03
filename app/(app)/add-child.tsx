import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { palette } from '@/components/ui/tokens';
import { useAuth } from '@/contexts/AuthContext';
import { addChild } from '@/lib/children';

interface FormErrors {
  fName?: string;
  lName?: string;
  DoB?: string;
}

function validate(fName: string, lName: string, DoB: string): FormErrors {
  const errors: FormErrors = {};
  if (!fName.trim()) errors.fName = 'First name is required';
  if (!lName.trim()) errors.lName = 'Last name is required';
  if (!DoB.trim()) {
    errors.DoB = 'Date of birth is required';
  } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(DoB.trim())) {
    errors.DoB = 'Enter a date in DD/MM/YYYY format';
  }
  return errors;
}

function parseDateString(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}

export default function AddChildScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [DoB, setDoB] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const lNameRef = useRef<TextInput>(null);
  const DoBRef = useRef<TextInput>(null);

  const handleCancel = useCallback(() => {
    const hasData = fName.trim() || lName.trim() || DoB.trim();
    if (!hasData) {
      router.back();
      return;
    }
    Alert.alert(
      'Discard changes?',
      'You have unsaved information. Are you sure you want to go back?',
      [
        { text: 'Keep editing', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: () => router.back() },
      ],
    );
  }, [fName, lName, DoB, router]);

  const handleSave = useCallback(async () => {
    const validationErrors = validate(fName, lName, DoB);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    if (!user?.id) return;

    try {
      setLoading(true);
      await addChild(fName.trim(), lName.trim(), parseDateString(DoB.trim()), user.id);
      router.back();
    } catch (err: any) {
      Alert.alert('Could not save', err?.message ?? 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, [fName, lName, DoB, user, router]);

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
          <Text style={styles.title}>Add a child</Text>
          <Text style={styles.subtitle}>Enter your child's details below</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="First Name"
            value={fName}
            onChangeText={(v) => {
              setFName(v);
              if (errors.fName) setErrors((e) => ({ ...e, fName: undefined }));
            }}
            placeholder="Emma"
            textContentType="givenName"
            autoComplete="given-name"
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => lNameRef.current?.focus()}
            error={errors.fName}
          />

          <Input
            ref={lNameRef}
            label="Last Name"
            value={lName}
            onChangeText={(v) => {
              setLName(v);
              if (errors.lName) setErrors((e) => ({ ...e, lName: undefined }));
            }}
            placeholder="Smith"
            textContentType="familyName"
            autoComplete="family-name"
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => DoBRef.current?.focus()}
            error={errors.lName}
          />

          <Input
            ref={DoBRef}
            label="Date of Birth"
            value={DoB}
            onChangeText={(v) => {
              setDoB(v);
              if (errors.DoB) setErrors((e) => ({ ...e, DoB: undefined }));
            }}
            placeholder="DD/MM/YYYY"
            keyboardType="numbers-and-punctuation"
            returnKeyType="done"
            onSubmitEditing={handleSave}
            error={errors.DoB}
          />

          <Button label="Save Child" onPress={handleSave} loading={loading} />
          <View style={{ height: 12}} />

          <Button label="Cancel" onPress={handleCancel} variant="ghost" disabled={loading} />
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
    marginBottom: 36,
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
  },
  form: {
    flex: 1,
  },
});
