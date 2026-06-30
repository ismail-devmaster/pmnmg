/**
 * Theme configuration — Obsidian Electric
 * Deep obsidian blacks, electric indigo accents, inspired by backend admin UI
 */

import '@/global.css';

import { Platform, type TextStyle } from 'react-native';

/* ── Premium Palette (direct access) ─────────────────── */

export const PremiumPalette = {
  // Backend obsidian palette
  obsidian: '#0A0B0F',
  obsidianLight: '#12131A',
  obsidian950: '#050510',
  obsidian900: '#0a0a1a',
  obsidian800: '#12122b',
  obsidian700: '#1a1a3e',
  obsidian600: '#252550',
  obsidian500: '#3a3a6b',
  obsidian400: '#515180',
  obsidian300: '#7c7ca0',
  obsidian200: '#a8a8c0',
  obsidian100: '#d4d4e0',
  obsidian50: '#f0f0f5',

  // Backend electric palette
  electric: '#6366f1',
  electricLight: '#818cf8',
  electricDark: '#4f46e5',
  electric50: '#eef2ff',
  electric100: '#e0e7ff',
  electric200: '#c7d2fe',
  electric300: '#a5b4fc',
  electric400: '#818cf8',
  electric500: '#6366f1',
  electric600: '#4f46e5',
  electric700: '#4338ca',
  electric800: '#3730a3',
  electric900: '#312e81',

  // Status colors (from backend)
  amber: '#fbbf24',
  amberDark: '#f59e0b',
  emerald: '#34d399',
  emeraldDark: '#10b981',
  red: '#ef4444',
  redDark: '#dc2626',

  // Legacy palette (kept for backward compatibility)
  champagneGold: '#6366f1',
  champagneGoldLight: '#818cf8',
  champagneGoldDark: '#4f46e5',
  pearl: '#0a0a1a',
  pearlMuted: '#d4d4e0',
  warmRed: '#ef4444',
  warmRedLight: '#3D1C1C',
  warmGray: '#252550',
  warmGrayDark: '#1a1a3e',
  navy: '#0a0a1a',
  navyLight: '#12122b',
  warmShadow: '#6366f1',
} as const;

/* ── Color Palette ────────────────────────────────────── */

export const Colors = {
  light: {
    // Surfaces
    text: '#1C1C1E',
    textSecondary: '#6B6B73',
    textTertiary: '#9A9AA2',
    background: '#FAFAF7',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#F0EDE6',
    backgroundSubtle: '#F5F3EE',
    card: '#FFFFFF',
    cardBorder: '#E8E4DC',

    // Brand
    primary: '#1B2A4A',
    primaryLight: '#E8EDF5',
    primaryDark: '#14203A',
    secondary: '#C9A961',
    secondaryLight: '#F5EFE0',
    accent: '#C9A961',
    accentLight: '#F5EFE0',

    // Status
    error: '#C44D4D',
    errorLight: '#F2D4D4',
    warning: '#C9A961',
    warningLight: '#F5EFE0',
    success: '#2D7A5F',
    successLight: '#E0F2EC',
    info: '#1B2A4A',
    infoLight: '#E8EDF5',

    // Text on brand
    onPrimary: '#FFFFFF',
    onSecondary: '#1C1C1E',
    onAccent: '#1C1C1E',
    onBackground: '#1C1C1E',
    onSurface: '#1C1C1E',

    // Borders & dividers
    border: '#E0DCD4',
    borderLight: '#F0EDE6',
    divider: '#F0EDE6',

    // Input states
    inputBackground: '#FFFFFF',
    inputBorder: '#D8D4CC',
    inputBorderFocus: '#C9A961',
    inputError: '#C44D4D',
    inputPlaceholder: '#9A9AA2',
  },
  dark: {
    // Surfaces
    text: '#EDEDE8',
    textSecondary: '#A0A0A8',
    textTertiary: '#6B6B73',
    background: '#0A0B0F',
    backgroundElement: '#12131A',
    backgroundSelected: '#2A2B33',
    backgroundSubtle: '#0E0F14',
    card: '#12131A',
    cardBorder: '#2A2B33',

    // Brand
    primary: '#C9A961',
    primaryLight: '#2A2218',
    primaryDark: '#D4B97A',
    secondary: '#C9A961',
    secondaryLight: '#2A2218',
    accent: '#C9A961',
    accentLight: '#2A2218',

    // Status
    error: '#E87070',
    errorLight: '#3D1C1C',
    warning: '#C9A961',
    warningLight: '#2A2218',
    success: '#5CC9A0',
    successLight: '#1A2E24',
    info: '#C9A961',
    infoLight: '#2A2218',

    // Text on brand
    onPrimary: '#0A0B0F',
    onSecondary: '#0A0B0F',
    onAccent: '#0A0B0F',
    onBackground: '#EDEDE8',
    onSurface: '#EDEDE8',

    // Borders & dividers
    border: '#2A2B33',
    borderLight: '#1E1F26',
    divider: '#1E1F26',

    // Input states
    inputBackground: '#16171E',
    inputBorder: '#2A2B33',
    inputBorderFocus: '#C9A961',
    inputError: '#E87070',
    inputPlaceholder: '#6B6B73',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/* ── Typography ──────────────────────────────────────── */

export const Typography: Record<string, TextStyle> = {
  displayHero: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '800',
    letterSpacing: -1.5,
  },
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
    sans: 'var(--font-body)',
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
    shadowColor: '#1C1C1E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  medium: {
    shadowColor: '#1C1C1E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  high: {
    shadowColor: '#1C1C1E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  elevated: {
    shadowColor: '#1C1C1E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 10,
  },
  glow: {
    shadowColor: '#C9A961',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

/* ── Platform-specific ───────────────────────────────── */

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

/* ── Legacy compatibility ────────────────────────────── */

export const BorderRadius = Radius;
