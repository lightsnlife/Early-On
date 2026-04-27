import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { palette } from './tokens';

interface LoadingOverlayProps {
  message?: string;
}

export default function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={palette.rose500} />
      {!!message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(44,36,56,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  message: {
    marginTop: 12,
    fontSize: 15,
    fontFamily: 'NunitoSans-Regular',
    color: palette.cardBg,
  },
});
