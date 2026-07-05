/**
 * Theme tokens — colors, typography, spacing, and shadows.
 * Single source of truth for the entire app's visual language.
 */

import '@/global.css';
import { Platform, type TextStyle } from 'react-native';

/* ── Color Palette ───────────────────────────────────── */

const palette = {
  // Surfaces
  background: '#0a0a1a',
  backgroundElement: '#12122b',
  backgroundSelected: '#1a1a3e',
  backgroundSubtle: '#0a0a1a',
  card: '#12122b',
  cardBorder: 'rgba(99, 102, 241, 0.12)',

  // Text
  text: '#f0f0f5',
  textSecondary: '#a8a8c0',
  textTertiary: '#7c7ca0',

  // Brand
  primary: '#6366f1',
  primaryLight: '#818cf8',
  primaryDark: '#4f46e5',

  // Status
  error: '#ef4444',
  errorLight: 'rgba(239, 68, 68, 0.15)',
  warning: '#fbbf24',
  warningLight: 'rgba(251, 191, 36, 0.15)',
  success: '#34d399',
  successLight: 'rgba(52, 211, 153, 0.15)',
  info: '#818cf8',
  infoLight: 'rgba(129, 140, 248, 0.15)',

  // Text on brand
  onPrimary: '#FFFFFF',

  // Borders
  border: 'rgba(99, 102, 241, 0.12)',
  borderLight: 'rgba(99, 102, 241, 0.25)',

  // Input states
  inputBackground: '#0a0a1a',
  inputBorder: 'rgba(37, 37, 80, 0.6)',
  inputPlaceholder: '#515180',
} as const;

export const Colors = {
  light: palette,
  dark: palette,
} as const;

export type ThemeColor = keyof typeof palette;

/* ── Typography ──────────────────────────────────────── */

export const Typography: Record<string, TextStyle> = {
  displayHero: { fontSize: 36, lineHeight: 44, fontWeight: '800', letterSpacing: -1.5 },
  displayLarge: { fontSize: 40, lineHeight: 48, fontWeight: '800', letterSpacing: -1.0 },
  display: { fontSize: 34, lineHeight: 42, fontWeight: '700', letterSpacing: -0.5 },
  headline: { fontSize: 28, lineHeight: 36, fontWeight: '700', letterSpacing: -0.3 },
  title: { fontSize: 22, lineHeight: 30, fontWeight: '600', letterSpacing: -0.1 },
  titleSmall: { fontSize: 18, lineHeight: 26, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400', letterSpacing: 0.1 },
  bodyMedium: { fontSize: 16, lineHeight: 24, fontWeight: '500', letterSpacing: 0.1 },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: '600', letterSpacing: 0.1 },
  label: { fontSize: 14, lineHeight: 20, fontWeight: '500', letterSpacing: 0.1 },
  labelSmall: { fontSize: 12, lineHeight: 16, fontWeight: '600', letterSpacing: 0.5 },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400', letterSpacing: 0.2 },
  code: {
    fontSize: 13, lineHeight: 18, fontWeight: '500', letterSpacing: 0,
    fontFamily: Platform.select({ ios: 'ui-monospace', android: 'monospace', web: 'var(--font-mono)' }),
  },
  overline: { fontSize: 11, lineHeight: 14, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' as const },
};

/* ── Spacing (8px base) ──────────────────────────────── */

export const Spacing = {
  half: 2, one: 4, two: 8, three: 12, four: 16, five: 20,
  six: 24, eight: 32, ten: 40, twelve: 48, sixteen: 64, twenty: 80,
} as const;

/* ── Radii ───────────────────────────────────────────── */

export const Radius = {
  xs: 4, sm: 6, md: 8, lg: 12, xl: 16, xxl: 20, full: 9999,
} as const;

/* ── Shadows ─────────────────────────────────────────── */

export const Elevation = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
};

/* ── Layout ──────────────────────────────────────────── */

export const MaxContentWidth = 800;
