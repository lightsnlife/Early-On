import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

function BiometricLockScreen() {
  const { unlockWithBiometrics, signOut } = useAuth();

  useEffect(() => {
    // Automatically prompt biometrics on mount
    unlockWithBiometrics();
  }, [unlockWithBiometrics]);

  return (
    <SafeAreaView style={styles.lockContainer}>
      <Text style={styles.lockBrand}>EarlyOn</Text>
      <Text style={styles.lockTitle}>App Locked</Text>
      <Text style={styles.lockSubtitle}>Authenticate to continue</Text>
      <View style={styles.lockActions}>
        <Button label="Unlock" onPress={unlockWithBiometrics} />
        <Button label="Sign out" variant="ghost" onPress={signOut} />
      </View>
    </SafeAreaView>
  );
}

export default function AppLayout() {
  const { status } = useAuth();

  if (status === 'unauthenticated') return <Redirect href="/(auth)/login" />;
  if (status === 'locked') return <BiometricLockScreen />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    />
  );
}

const styles = StyleSheet.create({
  lockContainer: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  lockBrand: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.surface,
    letterSpacing: 1,
    marginBottom: 40,
  },
  lockTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.surface,
    marginBottom: 8,
  },
  lockSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 40,
  },
  lockActions: {
    width: '100%',
    gap: 12,
  },
});
