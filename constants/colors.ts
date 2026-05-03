// Compatibility shim — maps legacy key names to the new design-token palette.
// Prefer importing from components/ui/tokens or using useTheme() in new code.
import { palette } from '../components/ui/tokens';

// Cycled in order as children are added (index stored in DB).
export const childColors = [
  { bg: palette.lavender50, text: palette.lavender400 },
  { bg: palette.mint50,     text: palette.mint400 },
  { bg: palette.butter50,   text: palette.butter500 },
  { bg: palette.rose50,     text: palette.rose500 },
  { bg: palette.peach50,    text: palette.peach400 },
  { bg: palette.sky50,      text: palette.sky400 },
] as const;

export const cardColors = {
  lavender: { bg: palette.lavender50, chipBg: palette.lavender100, text: palette.lavender400 },
  mint:     { bg: palette.mint50,     chipBg: palette.mint100,     text: palette.mint400 },
  butter:   { bg: palette.butter50,   chipBg: palette.butter100,   text: palette.butter500 },
  rose:     { bg: palette.rose50,     chipBg: palette.rose100,     text: palette.rose500 },
  peach:    { bg: palette.peach50,    chipBg: palette.peach100,    text: palette.peach400 },
  sky:      { bg: palette.sky50,      chipBg: palette.sky100,      text: palette.sky400 },
} as const;

export type CardColorKey = keyof typeof cardColors;

const colors = {
  primary:       palette.rose500,
  primaryLight:  palette.rose50,
  primaryDark:   palette.lavender500,
  accent:        palette.butter400,
  success:       palette.mint400,
  error:         palette.rose500,
  errorLight:    palette.rose50,
  warning:       palette.butter400,
  background:    palette.pageBg,
  surface:       palette.cardBg,
  textPrimary:   palette.dark,
  textSecondary: palette.mid,
  textDisabled:  palette.soft,
  border:        'rgba(139,117,212,0.12)' as const,
  borderFocus:   palette.rose500,
  overlay:       'rgba(44,36,56,0.5)' as const,
} as const;

export default colors;
