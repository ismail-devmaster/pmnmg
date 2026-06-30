import { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Elevation, PremiumPalette, Radius, Spacing } from '@/constants/theme';

export interface ThemedInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  containerStyle?: ViewProps['style'];
  inputStyle?: TextInputProps['style'];
  leftIcon?: React.ReactNode;
}

export function ThemedInput({
  label,
  error,
  hint,
  containerStyle,
  inputStyle,
  leftIcon,
  ...props
}: ThemedInputProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = isFocused
    ? PremiumPalette.champagneGold
    : error
      ? PremiumPalette.warmRed
      : theme.inputBorder;

  const focusShadow = isFocused
    ? {
        shadowColor: PremiumPalette.warmShadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
      }
    : Elevation.none;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: isFocused
              ? (theme.inputBackground as string)
              : theme.backgroundSubtle,
            borderColor,
            ...(error ? { borderColor: PremiumPalette.warmRed } : {}),
          },
          focusShadow,
        ]}
      >
        {leftIcon && (
          <View style={styles.iconContainer}>{leftIcon}</View>
        )}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithIcon : undefined,
            {
              color: theme.text,
            },
            inputStyle,
          ]}
          placeholderTextColor={theme.inputPlaceholder}
          selectionColor={PremiumPalette.champagneGold}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
      </View>
      {error && (
        <Text style={[styles.error, { color: PremiumPalette.warmRed }]}>
          {error}
        </Text>
      )}
      {!error && hint && (
        <Text style={[styles.hint, { color: theme.textTertiary }]}>
          {hint}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.five,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: Spacing.two,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Radius.lg,
    minHeight: 52,
  },
  iconContainer: {
    paddingLeft: Spacing.four,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    fontSize: 16,
    lineHeight: 22,
  },
  inputWithIcon: {
    paddingLeft: Spacing.three,
  },
  error: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: Spacing.one,
    marginLeft: Spacing.one,
  },
  hint: {
    fontSize: 12,
    marginTop: Spacing.one,
    marginLeft: Spacing.one,
  },
});
