import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {
  const { user, signOut, promptEnableBiometrics, biometricsAvailable } = useAuth();
  const [biometricLoading, setBiometricLoading] = useState(false);

  const handleEnableBiometrics = async () => {
    setBiometricLoading(true);
    try {
      const enabled = await promptEnableBiometrics();
      Alert.alert(
        enabled ? 'Biometrics enabled' : 'Setup cancelled',
        enabled
          ? 'You can now use biometrics to unlock the app.'
          : 'You can enable biometrics later from settings.'
      );
    } finally {
      setBiometricLoading(false);
    }
  };

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'there';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.brand}>EarlyOn</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.greeting}>Hello, {firstName}!</Text>
          <Text style={styles.subtitle}>You're signed in as</Text>
          <Text style={styles.email}>{user?.email}</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your dashboard is being built</Text>
            <Text style={styles.cardBody}>
              Features and modules will appear here as they are added to the project.
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          {biometricsAvailable && (
            <Button
              label="Enable biometric sign-in"
              variant="secondary"
              onPress={handleEnableBiometrics}
              loading={biometricLoading}
            />
          )}
          <Button
            label="Sign Out"
            variant="ghost"
            onPress={signOut}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  topBar: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  brand: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primaryDark,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingTop: 32,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  email: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 32,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  actions: {
    paddingBottom: 24,
    gap: 10,
  },
});
