// Compatibility shim — maps legacy key names to the new design-token palette.
// Prefer importing from components/ui/tokens or using useTheme() in new code.
import { palette } from '../components/ui/tokens';

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
