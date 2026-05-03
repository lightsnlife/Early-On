import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIcon from '@/components/ui/AppIconLarge';
import { useAuth } from '@/contexts/AuthContext';
import { palette } from '@/components/ui/tokens';



export default function Index() {
  const { status } = useAuth();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={palette.rose500} />
      </View>
    );
  }

  if (status === 'authenticated') return <Redirect href="/(app)/home" />;

  return (
    <View style={styles.root}>
      {/* ── Ambient blobs (simulate multi-radial gradient) ── */}
      <View style={[styles.blob, { width: 220, height: 180, backgroundColor: '#C8BAF4', opacity: 0.22, top: -40,  left: -60 }]} />
      <View style={[styles.blob, { width: 160, height: 160, backgroundColor: '#F8C9B5', opacity: 0.30, top: 60,   right: -50 }]} />
      <View style={[styles.blob, { width: 200, height: 160, backgroundColor: '#A8DECE', opacity: 0.22, bottom: 220, left: -40 }]} />
      <View style={[styles.blob, { width: 140, height: 140, backgroundColor: '#FAD98A', opacity: 0.20, bottom: 150, right: -30 }]} />

      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>

          {/* ── Illustration wrap ── */}
          <View style={styles.illustrationWrap}>

            {/* App icon */}
            <View>
              <AppIcon />
            </View>

            {/* Growth scene */}
{/*           <SvgXml xml={SCENE_SVG} width="100%" height={240} /> */}
{/*}              <Image source={require('@/assets/welcomeImg.png')} style={{ width: '100%', height: 240, borderRadius: 18 }} resizeMode="contain" /> */}

            {/* Brand */}
            <View style={styles.brandRow}>
              <Text style={styles.brandName}>
                early<Text style={styles.brandAccent}>on</Text>
              </Text>
              <Text style={styles.brandTagline}>Your companion through every milestone</Text>
            </View>

          </View>

          {/* ── CTAs ── */}
          <Pressable
            style={({ pressed }) => [styles.btnPrimary, pressed && styles.pressed]}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.btnPrimaryLabel}>Get started — it's free</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.btnGhost, pressed && styles.pressed]}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.btnGhostLabel}>I already have an account</Text>
          </Pressable>

          {/* Footer */}
          <Text style={styles.footer}>
            By continuing you agree to our{' '}
            <Text style={styles.footerLink}>Terms</Text>
            {' & '}
            <Text style={styles.footerLink}>Privacy Policy</Text>
            .{'\n'}Your family's data stays private, always.
          </Text>

        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: palette.pageBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: palette.pageBg,
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  safe: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 12,
    paddingBottom: 40,
  },

  // ── Illustration ──
  illustrationWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIcon: {
    width: 90,
    height: 90,
    borderRadius: 26,
    backgroundColor: palette.mint50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: palette.mint400,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },

  // ── Brand ──
  brandRow: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 10,
  },
  brandName: {
    fontSize: 42,
    fontFamily: 'Nunito-Black',
    letterSpacing: -1.5,
    lineHeight: 46,
    color: palette.dark,
  },
  brandAccent: {
    color: palette.rose500,
  },
  brandTagline: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Medium',
    color: palette.mid,
    marginTop: 6,
    letterSpacing: 0.02,
  },

  // ── Chips ──
  chips: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 28,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 999,
  },
  chipText: {
    fontSize: 12,
    fontFamily: 'NunitoSans-SemiBold',
    letterSpacing: 0.2,
  },

  // ── Buttons ──
  btnPrimary: {
    width: '100%',
    paddingVertical: 17,
    backgroundColor: palette.rose500,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: palette.rose500,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 8,
  },
  btnPrimaryLabel: {
    fontSize: 17,
    fontFamily: 'Nunito-ExtraBold',
    color: '#ffffff',
    letterSpacing: 0.1,
  },
  btnGhost: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(139,117,212,0.18)',
    alignItems: 'center',
  },
  btnGhostLabel: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: palette.mid,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },

  // ── Footer ──
  footer: {
    marginTop: 16,
    fontSize: 11,
    fontFamily: 'NunitoSans-Regular',
    color: palette.soft,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    color: palette.rose500,
    fontFamily: 'NunitoSans-SemiBold',
  },
});
