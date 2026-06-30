import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'outline';

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
    light: { bg: '#2563EB', text: '#FFFFFF', border: '#2563EB' },
    dark: { bg: '#60A5FA', text: '#0F1117', border: '#60A5FA' },
  },
  secondary: {
    light: { bg: '#059669', text: '#FFFFFF', border: '#059669' },
    dark: { bg: '#34D399', text: '#0F1117', border: '#34D399' },
  },
  accent: {
    light: { bg: '#D97706', text: '#FFFFFF', border: '#D97706' },
    dark: { bg: '#FBBF24', text: '#0F1117', border: '#FBBF24' },
  },
  danger: {
    light: { bg: '#DC2626', text: '#FFFFFF', border: '#DC2626' },
    dark: { bg: '#F87171', text: '#0F1117', border: '#F87171' },
  },
  ghost: {
    light: { bg: 'transparent', text: '#2563EB', border: 'transparent' },
    dark: { bg: 'transparent', text: '#60A5FA', border: 'transparent' },
  },
  outline: {
    light: { bg: 'transparent', text: '#2563EB', border: '#2563EB' },
    dark: { bg: 'transparent', text: '#60A5FA', border: '#60A5FA' },
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
  const isDark = theme.text === '#F3F4F6';
  const isDisabled = disabled || loading;

  const colors = VARIANT_CONFIG[variant][isDark ? 'dark' : 'light'];
  const sizeConfig = SIZE_CONFIG[size];

  const getOpacity = () => {
    if (isDisabled) return 0.5;
    return 1;
  };

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
        fullWidth && styles.fullWidth,
        variant === 'ghost' && styles.ghost,
        style,
      ]}
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
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