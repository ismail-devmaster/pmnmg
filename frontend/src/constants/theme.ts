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
    // Surfaces — Dark theme (matching backend)
    text: '#f0f0f5',
    textSecondary: '#a8a8c0',
    textTertiary: '#7c7ca0',
    background: '#0a0a1a',
    backgroundElement: '#12122b',
    backgroundSelected: '#1a1a3e',
    backgroundSubtle: '#0a0a1a',
    card: '#12122b',
    cardBorder: 'rgba(99, 102, 241, 0.12)',

    // Brand — Electric indigo
    primary: '#6366f1',
    primaryLight: '#eef2ff',
    primaryDark: '#4f46e5',
    secondary: '#818cf8',
    secondaryLight: '#e0e7ff',
    accent: '#6366f1',
    accentLight: '#eef2ff',

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
    onSecondary: '#0a0a1a',
    onAccent: '#0a0a1a',
    onBackground: '#f0f0f5',
    onSurface: '#f0f0f5',

    // Borders & dividers
    border: 'rgba(99, 102, 241, 0.12)',
    borderLight: 'rgba(99, 102, 241, 0.25)',
    divider: 'rgba(99, 102, 241, 0.12)',

    // Input states
    inputBackground: '#0a0a1a',
    inputBorder: 'rgba(37, 37, 80, 0.6)',
    inputBorderFocus: '#6366f1',
    inputError: '#ef4444',
    inputPlaceholder: '#515180',
  },
  dark: {
    // Surfaces
    text: '#f0f0f5',
    textSecondary: '#a8a8c0',
    textTertiary: '#7c7ca0',
    background: '#0a0a1a',
    backgroundElement: '#12122b',
    backgroundSelected: '#1a1a3e',
    backgroundSubtle: '#0a0a1a',
    card: '#12122b',
    cardBorder: 'rgba(99, 102, 241, 0.12)',

    // Brand
    primary: '#6366f1',
    primaryLight: '#eef2ff',
    primaryDark: '#4f46e5',
    secondary: '#818cf8',
    secondaryLight: '#e0e7ff',
    accent: '#6366f1',
    accentLight: '#eef2ff',

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
    onSecondary: '#0a0a1a',
    onAccent: '#0a0a1a',
    onBackground: '#f0f0f5',
    onSurface: '#f0f0f5',

    // Borders & dividers
    border: 'rgba(99, 102, 241, 0.12)',
    borderLight: 'rgba(99, 102, 241, 0.25)',
    divider: 'rgba(99, 102, 241, 0.12)',

    // Input states
    inputBackground: '#0a0a1a',
    inputBorder: 'rgba(37, 37, 80, 0.6)',
    inputBorderFocus: '#6366f1',
    inputError: '#ef4444',
    inputPlaceholder: '#515180',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  high: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 6,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 10,
  },
  glow: {
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 4,
  },
  cardHover: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 8,
  },
  glass: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.36,
    shadowRadius: 32,
    elevation: 6,
  },
} as const;

/* ── Platform-specific ───────────────────────────────── */

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

/* ── Legacy compatibility ────────────────────────────── */

export const BorderRadius = Radius;
