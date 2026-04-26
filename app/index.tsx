import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Redirect } from 'expo-router';
import colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { status } = useAuth();

  if (status === 'loading') {
    return (
      <View style={styles.container}>
        <Text style={styles.brand}>EarlyOn</Text>
        <ActivityIndicator size="large" color={colors.surface} style={styles.spinner} />
      </View>
    );
  }

  if (status === 'unauthenticated') {
    return <Redirect href="/(auth)/login" />;
  }

  // 'locked' or 'authenticated' — both go to the app; the lock screen
  // is handled inside the (app) navigator
  return <Redirect href="/(app)/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.surface,
    letterSpacing: 1,
  },
  spinner: {
    marginTop: 32,
  },
});
