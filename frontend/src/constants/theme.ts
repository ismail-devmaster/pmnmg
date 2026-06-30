/**
 * Theme configuration — Refined Modernism
 * Deep indigo primary, warm amber accents, layered depth
 */

import '@/global.css';

import { Platform, type TextStyle } from 'react-native';

/* ── Color Palette ────────────────────────────────────── */

export const Colors = {
  light: {
    // Surfaces
    text: '#1A1D26',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    background: '#F8F9FC',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#EEF0F6',
    backgroundSubtle: '#F1F3F9',
    card: '#FFFFFF',
    cardBorder: '#E8ECF4',

    // Brand
    primary: '#2563EB',
    primaryLight: '#DBEAFE',
    primaryDark: '#1D4ED8',
    secondary: '#059669',
    secondaryLight: '#D1FAE5',
    accent: '#D97706',
    accentLight: '#FEF3C7',

    // Status
    error: '#DC2626',
    errorLight: '#FEE2E2',
    warning: '#D97706',
    warningLight: '#FEF3C7',
    success: '#059669',
    successLight: '#D1FAE5',
    info: '#2563EB',
    infoLight: '#DBEAFE',

    // Text on brand
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onAccent: '#FFFFFF',
    onBackground: '#1A1D26',
    onSurface: '#1A1D26',

    // Borders & dividers
    border: '#E5E7EB',
    borderLight: '#F0F1F5',
    divider: '#F0F1F5',

    // Input states
    inputBackground: '#FFFFFF',
    inputBorder: '#D1D5DB',
    inputBorderFocus: '#2563EB',
    inputError: '#DC2626',
    inputPlaceholder: '#9CA3AF',
  },
  dark: {
    // Surfaces
    text: '#F3F4F6',
    textSecondary: '#9CA3AF',
    textTertiary: '#6B7280',
    background: '#0F1117',
    backgroundElement: '#1A1D2E',
    backgroundSelected: '#242840',
    backgroundSubtle: '#161929',
    card: '#1A1D2E',
    cardBorder: '#2A2E42',

    // Brand
    primary: '#60A5FA',
    primaryLight: '#1E3A5F',
    primaryDark: '#93BBFD',
    secondary: '#34D399',
    secondaryLight: '#064E3B',
    accent: '#FBBF24',
    accentLight: '#78350F',

    // Status
    error: '#F87171',
    errorLight: '#7F1D1D',
    warning: '#FBBF24',
    warningLight: '#78350F',
    success: '#34D399',
    successLight: '#064E3B',
    info: '#60A5FA',
    infoLight: '#1E3A5F',

    // Text on brand
    onPrimary: '#0F1117',
    onSecondary: '#0F1117',
    onAccent: '#0F1117',
    onBackground: '#F3F4F6',
    onSurface: '#F3F4F6',

    // Borders & dividers
    border: '#2A2E42',
    borderLight: '#1E2136',
    divider: '#1E2136',

    // Input states
    inputBackground: '#1A1D2E',
    inputBorder: '#2A2E42',
    inputBorderFocus: '#60A5FA',
    inputError: '#F87171',
    inputPlaceholder: '#6B7280',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/* ── Typography ──────────────────────────────────────── */

export const Typography: Record<string, TextStyle> = {
  displayLarge: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '800',
    letterSpacing: -1.0,
  },
  display: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  headline: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  title: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  titleSmall: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    letterSpacing: 0,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  bodyMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  bodyStrong: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  labelSmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  code: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: Platform.select({ android: '700' }) ?? '500',
    letterSpacing: 0,
    fontFamily: Platform.select({
      ios: 'ui-monospace',
      android: 'monospace',
      web: 'var(--font-mono)',
    }),
  },
  overline: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

/* ── Spacing (8px base grid) ─────────────────────────── */

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
  eight: 32,
  ten: 40,
  twelve: 48,
  sixteen: 64,
  twenty: 80,
} as const;

/* ── Radii ───────────────────────────────────────────── */

export const Radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
} as const;

/* ── Elevation / Shadows ─────────────────────────────── */

export const Elevation = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  low: {
    shadowColor: '#1A1D26',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#1A1D26',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  high: {
    shadowColor: '#1A1D26',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  elevated: {
    shadowColor: '#1A1D26',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 10,
  },
} as const;

/* ── Platform-specific ───────────────────────────────── */

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

/* ── Legacy compatibility ────────────────────────────── */

export const BorderRadius = Radius;