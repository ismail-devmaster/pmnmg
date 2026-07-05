import {
  ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
type Size = 'small' | 'medium' | 'large';

export interface ThemedButtonProps extends Omit<TouchableOpacityProps, 'style' | 'onPress'> {
  title: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const SIZE_MAP: Record<Size, { py: number; px: number; fs: number; radius: number; minH: number }> = {
  small: { py: Spacing.three, px: Spacing.five, fs: 13, radius: Radius.sm, minH: 36 },
  medium: { py: Spacing.four, px: Spacing.six, fs: 15, radius: Radius.md, minH: 48 },
  large: { py: 22, px: Spacing.eight, fs: 16, radius: Radius.lg, minH: 56 },
};

function getVariantColors(variant: Variant) {
  switch (variant) {
    case 'primary':
      return { bg: '#6366f1', text: '#FFFFFF', border: '#6366f1' };
    case 'secondary':
      return { bg: '#818cf8', text: '#FFFFFF', border: '#818cf8' };
    case 'danger':
      return { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.25)' };
    case 'ghost':
      return { bg: 'transparent', text: undefined, border: 'transparent' };
    case 'outline':
      return { bg: 'transparent', text: '#818cf8', border: 'rgba(99, 102, 241, 0.3)' };
  }
}

export function ThemedButton({
  title, onPress, variant = 'primary', size = 'medium',
  disabled = false, loading = false, fullWidth = true, style, ...props
}: ThemedButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;
  const s = SIZE_MAP[size];
  const colors = getVariantColors(variant);

  return (
    <TouchableOpacity
      style={[
        styles.base,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          borderRadius: s.radius,
          minHeight: s.minH,
          opacity: isDisabled ? 0.5 : 1,
        },
        fullWidth && styles.fullWidth,
        variant === 'ghost' && styles.noBorder,
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
        <Text style={[styles.text, { color: colors.text ?? theme.textSecondary, fontSize: s.fs }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5 },
  fullWidth: { width: '100%' },
  noBorder: { borderWidth: 0 },
  text: { fontWeight: '600', letterSpacing: 0.2 },
});
