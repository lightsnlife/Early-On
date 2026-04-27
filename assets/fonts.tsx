import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from '@expo-google-fonts/nunito';
import {
  NunitoSans_400Regular,
  NunitoSans_500Medium,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans';
import { ThemeProvider } from './theme';
import { palette } from '../components/ui/tokens';

export const EARLYON_FONTS = {
  'Nunito-Regular':    Nunito_400Regular,
  'Nunito-Medium':     Nunito_500Medium,
  'Nunito-SemiBold':   Nunito_600SemiBold,
  'Nunito-Bold':       Nunito_700Bold,
  'Nunito-BoldItalic': Nunito_700Bold_Italic,
  'Nunito-ExtraBold':  Nunito_800ExtraBold,
  'Nunito-Black':      Nunito_900Black,
  'NunitoSans-Regular':  NunitoSans_400Regular,
  'NunitoSans-Medium':   NunitoSans_500Medium,
  'NunitoSans-SemiBold': NunitoSans_600SemiBold,
  'NunitoSans-Bold':     NunitoSans_700Bold,
} as const;

function FontLoader() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.pageBg }}>
      <ActivityIndicator color={palette.rose500} />
    </View>
  );
}

export function AppWithFonts({ children }: { children: React.ReactNode }) {
  const [fontsLoaded, fontError] = useFonts(EARLYON_FONTS);

  if (!fontsLoaded && !fontError) {
    return <FontLoader />;
  }

  return <ThemeProvider>{children}</ThemeProvider>;
}
