/**
 * EarlyOn Theme
 * Wraps the app in a theme context so any component can access
 * design tokens via the useTheme() hook.
 *
 * Usage:
 *   1. Wrap your root in <ThemeProvider> inside App.tsx
 *   2. Call const theme = useTheme() inside any component
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { colors, typography, spacing, radii, shadows, animation, palette } from '../components/ui/tokens';

const theme = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  animation,
  palette,
} as const;

export type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}

export { theme };
