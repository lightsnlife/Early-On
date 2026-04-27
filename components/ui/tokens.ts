/**
 * EarlyOn Design Tokens
 * Single source of truth for all visual values.
 * Import this wherever you need colours, spacing, radii or shadows.
 */

// ─── Colour palette ────────────────────────────────────────────────────────
export const palette = {
  // Rose — primary brand, CTAs, highlights
  rose50:  '#FDEDF2',
  rose100: '#FAD0E0',
  rose200: '#F5B8CF',
  rose300: '#ED93B1',
  rose400: '#E06A93',
  rose500: '#D4537E',  // ← primary brand colour
  rose600: '#B83D66',
  rose700: '#932D50',
  roseVein: '#C8749A', // leaf vein detail

  // Mint — growth, health, positive states
  mint50:  '#E6F5F0',
  mint100: '#C4E8DC',
  mint200: '#A8DECE',
  mint300: '#74C9B3',
  mint400: '#4BB89B',  // ← primary mint
  mint500: '#329A80',
  mint600: '#1F7A63',

  // Lavender — navigation, development category
  lavender50:  '#EDE8FB',
  lavender100: '#D8D0F7',
  lavender200: '#C8BAF4',
  lavender300: '#A898EC',
  lavender400: '#8B75D4',  // ← primary lavender
  lavender500: '#6E56BE',
  lavender600: '#5340A0',

  // Butter — milestones, schedule, warm accents
  butter50:  '#FEF5E0',
  butter100: '#FDE8A8',
  butter200: '#FAD98A',
  butter300: '#F5C24A',
  butter400: '#D4A017',  // ← primary butter
  butter500: '#A07A10',

  // Peach — feeding, nutrition category
  peach50:  '#FDEEE8',
  peach100: '#FAD8C8',
  peach200: '#F8C9B5',
  peach300: '#F2A888',
  peach400: '#E8906A',  // ← primary peach
  peach500: '#CF7048',

  // Sky — media, sounds category
  sky50:  '#E5F1FA',
  sky100: '#C4DDEF',
  sky200: '#A6CCE8',
  sky300: '#72AED8',
  sky400: '#5FA3D4',  // ← primary sky
  sky500: '#3D86BA',

  // Neutrals
  dark:   '#2C2438',  // primary text
  mid:    '#6B6380',  // secondary text
  soft:   '#9990AE',  // placeholder / disabled text
  border: 'rgba(139, 117, 212, 0.12)',
  cardBg: '#FFFCFE',
  pageBg: '#FBF8FF',
  white:  '#FFFFFF',
  black:  '#0E0B17',
} as const;

// ─── Semantic colour aliases ────────────────────────────────────────────────
export const colors = {
  // Text
  textPrimary:   palette.dark,
  textSecondary: palette.mid,
  textTertiary:  palette.soft,
  textOnDark:    palette.white,
  textOnBrand:   palette.white,

  // Backgrounds
  backgroundPage: palette.pageBg,
  backgroundCard: palette.cardBg,
  backgroundWhite: palette.white,

  // Brand / interactive
  brandPrimary:   palette.rose500,
  brandSecondary: palette.lavender400,
  brandAccent:    palette.mint400,

  // Category colours (icon backgrounds)
  categoryGrowth:      palette.lavender50,
  categoryHealth:      palette.mint50,
  categoryDevelopment: palette.butter50,
  categoryLearning:    palette.rose50,
  categoryNutrition:   palette.peach50,
  categoryMeds:        palette.sky50,
  categorySleep:       palette.lavender50,

  // States
  success:  palette.mint400,
  warning:  palette.butter400,
  error:    palette.rose500,
  info:     palette.sky400,

  // Border
  border:       palette.border,
  borderStrong: 'rgba(139, 117, 212, 0.25)',
} as const;

// ─── Typography ────────────────────────────────────────────────────────────
export const typography = {
  // Font families
  fontDisplay: 'Nunito',      // headings, brand name, buttons
  fontBody:    'Nunito Sans', // body text, labels, metadata

  // Font weights
  weightRegular:   '400',
  weightMedium:    '500',
  weightSemiBold:  '600',
  weightBold:      '700',
  weightExtraBold: '800',
  weightBlack:     '900',

  // Scale (in px / React Native pts)
  size2xs: 10,
  sizeXs:  11,
  sizeSm:  12,
  sizeMd:  13,
  sizeBase:14,
  sizeLg:  16,
  sizeXl:  18,
  size2xl: 20,
  size3xl: 22,
  size4xl: 26,
  size5xl: 32,
  size6xl: 40,
  size7xl: 48,

  // Line heights
  lineHeightTight:  1.2,
  lineHeightSnug:   1.35,
  lineHeightNormal: 1.5,
  lineHeightRelaxed:1.65,

  // Letter spacing
  trackingTight:  -0.5,
  trackingNormal:  0,
  trackingWide:    0.3,
  trackingWider:   0.6,
  trackingWidest:  1.2,
} as const;

// ─── Spacing scale ──────────────────────────────────────────────────────────
export const spacing = {
  px:   1,
  0.5:  2,
  1:    4,
  1.5:  6,
  2:    8,
  2.5: 10,
  3:   12,
  3.5: 14,
  4:   16,
  5:   20,
  6:   24,
  7:   28,
  8:   32,
  9:   36,
  10:  40,
  12:  48,
  14:  56,
  16:  64,
  20:  80,
  24:  96,
} as const;

// ─── Border radius ──────────────────────────────────────────────────────────
export const radii = {
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  '2xl':24,
  '3xl':28,
  full: 9999,
} as const;

// ─── Shadows (React Native format) ─────────────────────────────────────────
export const shadows = {
  xs: {
    shadowColor: palette.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  sm: {
    shadowColor: palette.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: palette.lavender400,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: palette.lavender400,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 8,
  },
  brand: {
    shadowColor: palette.rose500,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  icon: {
    shadowColor: palette.mint400,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;

// ─── Animation durations ───────────────────────────────────────────────────
export const animation = {
  fast:   150,
  normal: 250,
  slow:   400,
  slower: 600,
} as const;
