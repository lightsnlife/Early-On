import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { palette } from '@/components/ui/tokens';
import AppIconStd from '@/components/ui/AppIconStd';

interface TopBarProps {
  onMenuPress?: () => void;
}

export default function TopBar({ onMenuPress }: TopBarProps) {
  return (
    <View style={styles.row}>
      <View>
        <AppIconStd />
      </View>
      <View style={styles.brand}>
        <Text style={styles.brandName}>
          early<Text style={styles.brandNameAccent}>on</Text>
        </Text>
      </View>
      <Pressable onPress={onMenuPress} style={styles.menuButton} hitSlop={8}>
        <Text style={styles.menuIcon}>☰</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brand: {
    flex: 1,
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 26,
    fontFamily: 'Nunito-Black',
    color: palette.dark,
    marginLeft: 10,
    letterSpacing: -0.3,
  },
  brandNameAccent: {
    color: palette.rose500,
  },
  menuButton: {
    padding: 4,
  },
  menuIcon: {
    fontSize: 22,
    color: palette.dark,
  },
});
