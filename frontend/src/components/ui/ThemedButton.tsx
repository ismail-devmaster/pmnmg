import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Elevation, PremiumPalette, Radius, Spacing } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'outline' | 'premium';

export interface ThemedButtonProps extends Omit<TouchableOpacityProps, 'style' | 'onPress'> {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  leftIcon?: React.ReactNode;
}

const VARIANT_CONFIG = {
  primary: {
    light: { bg: '#6366f1', text: '#FFFFFF', border: '#6366f1' },
    dark: { bg: '#4f46e5', text: '#FFFFFF', border: '#4f46e5' },
  },
  secondary: {
    light: { bg: '#818cf8', text: '#FFFFFF', border: '#818cf8' },
    dark: { bg: '#6366f1', text: '#FFFFFF', border: '#6366f1' },
  },
  accent: {
    light: { bg: '#fbbf24', text: '#0a0a1a', border: '#fbbf24' },
    dark: { bg: '#f59e0b', text: '#0a0a1a', border: '#f59e0b' },
  },
  danger: {
    light: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.25)' },
    dark: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.25)' },
  },
  ghost: {
    light: { bg: 'transparent', text: '#a8a8c0', border: 'transparent' },
    dark: { bg: 'transparent', text: '#a8a8c0', border: 'transparent' },
  },
  outline: {
    light: { bg: 'transparent', text: '#818cf8', border: 'rgba(99, 102, 241, 0.3)' },
    dark: { bg: 'transparent', text: '#818cf8', border: 'rgba(99, 102, 241, 0.3)' },
  },
  premium: {
    light: { bg: '#6366f1', text: '#FFFFFF', border: '#6366f1' },
    dark: { bg: '#4f46e5', text: '#FFFFFF', border: '#4f46e5' },
  },
} as const;

const VARIANT_SHADOW = {
  primary: {
    light: {
      shadowColor: '#6366f1',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    dark: {
      shadowColor: '#4f46e5',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
      elevation: 4,
    },
  },
  secondary: {
    light: {
      shadowColor: '#818cf8',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 3,
    },
    dark: {
      shadowColor: '#6366f1',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 3,
    },
  },
  premium: {
    light: {
      shadowColor: '#6366f1',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    dark: {
      shadowColor: '#4f46e5',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 10,
      elevation: 5,
    },
  },
} as const;

const SIZE_CONFIG = {
  small: {
    paddingV: Spacing.three,
    paddingH: Spacing.five,
    fontSize: 13,
    radius: Radius.sm,
    minHeight: 36,
  },
  medium: {
    paddingV: Spacing.four,
    paddingH: Spacing.six,
    fontSize: 15,
    radius: Radius.md,
    minHeight: 48,
  },
  large: {
    paddingV: Spacing.five + Spacing.one,
    paddingH: Spacing.eight,
    fontSize: 16,
    radius: Radius.lg,
    minHeight: 56,
  },
} as const;

export function ThemedButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
  leftIcon,
  ...props
}: ThemedButtonProps) {
  const theme = useTheme();
  const isDark = theme.text === '#f0f0f5';
  const isDisabled = disabled || loading;

  const colors = VARIANT_CONFIG[variant][isDark ? 'dark' : 'light'];
  const sizeConfig = SIZE_CONFIG[size];

  const getOpacity = () => {
    if (isDisabled) return 0.5;
    return 1;
  };

  const shadowStyle = (VARIANT_SHADOW as Record<string, Record<string, ViewStyle>>)[variant]
    ? (VARIANT_SHADOW as Record<string, Record<string, ViewStyle>>)[variant][isDark ? 'dark' : 'light']
    : Elevation.none;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          paddingVertical: sizeConfig.paddingV,
          paddingHorizontal: sizeConfig.paddingH,
          borderRadius: sizeConfig.radius,
          minHeight: sizeConfig.minHeight,
          opacity: getOpacity(),
        },
        shadowStyle,
        fullWidth && styles.fullWidth,
        variant === 'ghost' && styles.ghost,
        style,
      ]}
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} size="small" />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text
            style={[
              styles.buttonText,
              {
                color: colors.text,
                fontSize: sizeConfig.fontSize,
              },
              leftIcon ? styles.buttonTextWithIcon : undefined,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  fullWidth: {
    width: '100%',
  },
  ghost: {
    borderWidth: 0,
  },
  buttonText: {
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  buttonTextWithIcon: {
    marginLeft: Spacing.two,
  },
});
