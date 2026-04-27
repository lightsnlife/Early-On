import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { useAuth } from '@/contexts/AuthContext';
import { palette } from '@/components/ui/tokens';

// ─── App icon SVG (heart-leaf) ────────────────────────────────────────────────
const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <path d="M100 158 C68 138 34 112 34 82 C34 58 50 44 68 46 C80 47 92 56 100 66
           C108 56 120 47 132 46 C150 44 166 58 166 82 C166 112 132 138 100 158Z"
        fill="#F5B8CF"/>
  <path d="M100 66 Q100 110 100 158" fill="none" stroke="#C8749A" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
  <path d="M100 88  Q82  80  66  72"  fill="none" stroke="#C8749A" stroke-width="1.8" stroke-linecap="round" opacity="0.40"/>
  <path d="M100 104 Q78  96  58  90"  fill="none" stroke="#C8749A" stroke-width="1.8" stroke-linecap="round" opacity="0.40"/>
  <path d="M100 120 Q82 114  66 110"  fill="none" stroke="#C8749A" stroke-width="1.6" stroke-linecap="round" opacity="0.35"/>
  <path d="M100 88  Q118  80 134  72"  fill="none" stroke="#C8749A" stroke-width="1.8" stroke-linecap="round" opacity="0.40"/>
  <path d="M100 104 Q122  96 142  90"  fill="none" stroke="#C8749A" stroke-width="1.8" stroke-linecap="round" opacity="0.40"/>
  <path d="M100 120 Q118 114 134 110"  fill="none" stroke="#C8749A" stroke-width="1.6" stroke-linecap="round" opacity="0.35"/>
</svg>`;

// ─── Three-stage growth illustration (320×240) ────────────────────────────────
const SCENE_SVG = `<svg width="320" height="240" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="52" cy="80" r="44" fill="#EDE8FB" opacity="0.55"/>
  <circle cx="160" cy="60" r="36" fill="#FEF5E0" opacity="0.45"/>
  <circle cx="268" cy="72" r="44" fill="#E6F5F0" opacity="0.55"/>
  <rect x="10" y="206" width="300" height="22" rx="11" fill="#EDE8FB" opacity="0.5"/>
  <ellipse cx="56" cy="212" rx="28" ry="7" fill="#C8BAF4" opacity="0.18"/>
  <ellipse cx="160" cy="212" rx="34" ry="7" fill="#C8BAF4" opacity="0.18"/>
  <ellipse cx="266" cy="212" rx="38" ry="7" fill="#C8BAF4" opacity="0.18"/>
  <path d="M56 190 Q160 110 266 160" fill="none" stroke="#C8BAF4" stroke-width="2" stroke-dasharray="5 5" stroke-linecap="round" opacity="0.7"/>
  <circle cx="113" cy="143" r="3.5" fill="#C8BAF4" opacity="0.8"/>
  <circle cx="213" cy="131" r="3.5" fill="#C8BAF4" opacity="0.8"/>
  <circle cx="56" cy="168" r="34" fill="#FDEDF2" opacity="0.45"/>
  <ellipse cx="56" cy="188" rx="22" ry="18" fill="#F5B8CF"/>
  <path d="M36 186 Q56 178 76 186" fill="none" stroke="#E898BE" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  <path d="M38 192 Q56 185 74 192" fill="none" stroke="#E898BE" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/>
  <ellipse cx="47" cy="204" rx="6" ry="4" fill="#F8C9B5" transform="rotate(-15 47 204)"/>
  <ellipse cx="66" cy="204" rx="6" ry="4" fill="#F8C9B5" transform="rotate(15 66 204)"/>
  <circle cx="43" cy="202" r="1.5" fill="#F5B8CF" opacity="0.7"/>
  <circle cx="70" cy="202" r="1.5" fill="#F5B8CF" opacity="0.7"/>
  <circle cx="76" cy="184" r="5" fill="#F8C9B5"/>
  <circle cx="56" cy="158" r="19" fill="#F8C9B5"/>
  <path d="M44 146 Q56 136 68 146 Q62 139 56 138 Q50 139 44 146Z" fill="#FAD98A" opacity="0.85"/>
  <circle cx="50" cy="156" r="3" fill="#2C2438" opacity="0.55"/>
  <circle cx="62" cy="156" r="3" fill="#2C2438" opacity="0.55"/>
  <circle cx="51.5" cy="154.5" r="1" fill="white" opacity="0.8"/>
  <circle cx="63.5" cy="154.5" r="1" fill="white" opacity="0.8"/>
  <circle cx="45" cy="161" r="5" fill="#F5B8CF" opacity="0.4"/>
  <circle cx="67" cy="161" r="5" fill="#F5B8CF" opacity="0.4"/>
  <path d="M51 164 Q56 167 61 164" fill="none" stroke="#D4537E" stroke-width="1.5" stroke-linecap="round"/>
  <rect x="28" y="216" width="56" height="18" rx="9" fill="#FDEDF2"/>
  <text x="56" y="228" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="700" fill="#D4537E">0 - 12 mo</text>
  <circle cx="160" cy="160" r="40" fill="#FEF5E0" opacity="0.4"/>
  <rect x="142" y="170" width="36" height="40" rx="18" fill="#FAD98A"/>
  <circle cx="160" cy="188" r="2" fill="#F5C14A" opacity="0.5"/>
  <path d="M142 178 Q124 172 118 168" fill="none" stroke="#FAD98A" stroke-width="9" stroke-linecap="round"/>
  <circle cx="116" cy="167" r="7" fill="#F8C9B5"/>
  <path d="M178 178 Q196 168 200 162" fill="none" stroke="#FAD98A" stroke-width="9" stroke-linecap="round"/>
  <circle cx="202" cy="160" r="7" fill="#F8C9B5"/>
  <circle cx="202" cy="150" r="8" fill="#A8DECE" opacity="0.9"/>
  <line x1="202" y1="158" x2="202" y2="160" stroke="#6B6380" stroke-width="1.2" opacity="0.5"/>
  <rect x="146" y="206" width="12" height="14" rx="6" fill="#FAD98A"/>
  <rect x="162" y="206" width="12" height="14" rx="6" fill="#FAD98A"/>
  <ellipse cx="152" cy="219" rx="9" ry="5" fill="#8B75D4" opacity="0.7"/>
  <ellipse cx="168" cy="219" rx="9" ry="5" fill="#8B75D4" opacity="0.7"/>
  <circle cx="160" cy="155" r="22" fill="#F8C9B5"/>
  <path d="M146 140 Q160 128 174 140 Q168 132 160 130 Q152 132 146 140Z" fill="#E8906A" opacity="0.85"/>
  <path d="M140 148 Q137 142 142 140" fill="none" stroke="#E8906A" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  <path d="M180 148 Q183 142 178 140" fill="none" stroke="#E8906A" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  <circle cx="153" cy="153" r="3.5" fill="#2C2438" opacity="0.6"/>
  <circle cx="167" cy="153" r="3.5" fill="#2C2438" opacity="0.6"/>
  <circle cx="154.5" cy="151.5" r="1.2" fill="white" opacity="0.8"/>
  <circle cx="168.5" cy="151.5" r="1.2" fill="white" opacity="0.8"/>
  <circle cx="146" cy="159" r="6" fill="#F5B8CF" opacity="0.4"/>
  <circle cx="174" cy="159" r="6" fill="#F5B8CF" opacity="0.4"/>
  <path d="M153 164 Q160 170 167 164" fill="none" stroke="#D4537E" stroke-width="2" stroke-linecap="round"/>
  <rect x="131" y="226" width="58" height="18" rx="9" fill="#FEF5E0"/>
  <text x="160" y="238" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="700" fill="#A07A10">1 - 3 yrs</text>
  <circle cx="266" cy="150" r="46" fill="#E6F5F0" opacity="0.4"/>
  <rect x="250" y="162" width="32" height="52" rx="12" fill="#A8DECE"/>
  <path d="M250 174 Q266 168 282 174" fill="none" stroke="#7EC8B8" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  <path d="M250 170 Q236 162 230 154" fill="none" stroke="#A8DECE" stroke-width="9" stroke-linecap="round"/>
  <circle cx="228" cy="152" r="7" fill="#F8C9B5"/>
  <path d="M282 170 Q294 155 294 140" fill="none" stroke="#A8DECE" stroke-width="9" stroke-linecap="round"/>
  <circle cx="294" cy="137" r="7" fill="#F8C9B5"/>
  <path d="M294 122 L296 129 L303 131 L296 133 L294 140 L292 133 L285 131 L292 129Z" fill="#FAD98A" opacity="0.9"/>
  <path d="M258 210 Q254 218 250 226" fill="none" stroke="#A8DECE" stroke-width="10" stroke-linecap="round"/>
  <path d="M274 210 Q278 218 282 226" fill="none" stroke="#A8DECE" stroke-width="10" stroke-linecap="round"/>
  <ellipse cx="248" cy="226" rx="11" ry="6" fill="#8B75D4" opacity="0.75"/>
  <ellipse cx="284" cy="226" rx="11" ry="6" fill="#8B75D4" opacity="0.75"/>
  <path d="M240 225 Q248 222 256 225" fill="none" stroke="white" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
  <path d="M276 225 Q284 222 292 225" fill="none" stroke="white" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
  <ellipse cx="266" cy="147" rx="19" ry="21" fill="#F8C9B5"/>
  <path d="M248 140 Q252 126 266 124 Q280 126 284 140 Q278 130 266 128 Q254 130 248 140Z" fill="#2C2438" opacity="0.75"/>
  <path d="M248 142 Q245 148 247 155" fill="none" stroke="#2C2438" stroke-width="3" stroke-linecap="round" opacity="0.45"/>
  <circle cx="259" cy="146" r="3.5" fill="#2C2438" opacity="0.65"/>
  <circle cx="273" cy="146" r="3.5" fill="#2C2438" opacity="0.65"/>
  <circle cx="260.5" cy="144.5" r="1.2" fill="white" opacity="0.8"/>
  <circle cx="274.5" cy="144.5" r="1.2" fill="white" opacity="0.8"/>
  <path d="M256 141 Q259 139 262 141" fill="none" stroke="#2C2438" stroke-width="1.5" stroke-linecap="round" opacity="0.45"/>
  <path d="M270 141 Q273 139 276 141" fill="none" stroke="#2C2438" stroke-width="1.5" stroke-linecap="round" opacity="0.45"/>
  <circle cx="254" cy="152" r="5" fill="#F5B8CF" opacity="0.3"/>
  <circle cx="278" cy="152" r="5" fill="#F5B8CF" opacity="0.3"/>
  <path d="M260 157 Q266 162 272 157" fill="none" stroke="#D4537E" stroke-width="2" stroke-linecap="round"/>
  <rect x="237" y="232" width="58" height="18" rx="9" fill="#E6F5F0"/>
  <text x="266" y="244" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="700" fill="#329A80">4 - 8 yrs</text>
  <circle cx="18" cy="42" r="4" fill="#FAD98A" opacity="0.6"/>
  <circle cx="96" cy="18" r="3" fill="#A8DECE" opacity="0.6"/>
  <circle cx="300" cy="28" r="3.5" fill="#F5B8CF" opacity="0.6"/>
  <circle cx="308" cy="108" r="3" fill="#C8BAF4" opacity="0.6"/>
  <circle cx="14" cy="150" r="3" fill="#F8C9B5" opacity="0.55"/>
  <path d="M20 100 C18.5 97.5 15 97.5 15 101 C15 104.5 18.5 107 20 108.5 C21.5 107 25 104.5 25 101 C25 97.5 21.5 97.5 20 100Z" fill="#F5B8CF" opacity="0.5"/>
  <path d="M300 70 C298.5 67 295 67 295 71 C295 75 298.5 78 300 79.5 C301.5 78 305 75 305 71 C305 67 301.5 67 300 70Z" fill="#C8BAF4" opacity="0.5"/>
</svg>`;

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
            <View style={styles.appIcon}>
              <SvgXml xml={ICON_SVG} width={58} height={58} />
            </View>

            {/* Growth scene */}
            <SvgXml xml={SCENE_SVG} width="100%" height={240} />

            {/* Brand */}
            <View style={styles.brandRow}>
              <Text style={styles.brandName}>
                early<Text style={styles.brandAccent}>on</Text>
              </Text>
              <Text style={styles.brandTagline}>Your companion through every milestone</Text>
            </View>

            {/* Age chips */}
            <View style={styles.chips}>
              <View style={[styles.chip, { backgroundColor: palette.lavender50 }]}>
                <Text style={[styles.chipText, { color: palette.lavender400 }]}>Newborn</Text>
              </View>
              <View style={[styles.chip, { backgroundColor: palette.mint50 }]}>
                <Text style={[styles.chipText, { color: palette.mint400 }]}>Toddler</Text>
              </View>
              <View style={[styles.chip, { backgroundColor: palette.butter50 }]}>
                <Text style={[styles.chipText, { color: palette.butter500 }]}>School age</Text>
              </View>
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
