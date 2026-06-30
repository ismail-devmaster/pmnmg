import { useState, useCallback, useMemo } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

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
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  ...restProps
}: ThemedInputProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(
    (e: any) => {
      setIsFocused(true);
      onFocusProp?.(e);
    },
    [onFocusProp],
  );

  const handleBlur = useCallback(
    (e: any) => {
      setIsFocused(false);
      onBlurProp?.(e);
    },
    [onBlurProp],
  );

  // Border color: the ONLY visual focus indicator — no elevation change, no layer switch
  const borderColor = useMemo(() => {
    if (error) return '#ef4444';
    if (isFocused) return '#6366f1';
    return theme.inputBorder;
  }, [isFocused, error, theme.inputBorder]);

  // Background subtly brightens on focus — purely visual, no layout impact
  const backgroundColor = useMemo(() => {
    return isFocused
      ? (theme.inputBackground as string)
      : theme.backgroundSubtle;
  }, [isFocused, theme.inputBackground, theme.backgroundSubtle]);

  const inputStyleResolved = useMemo(
    () => [
      styles.input,
      leftIcon ? styles.inputWithIcon : undefined,
      { color: theme.text },
      inputStyle,
    ],
    [leftIcon, theme.text, inputStyle],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.inputWrapper,
          { backgroundColor, borderColor },
        ]}
      >
        {leftIcon ? (
          <View style={styles.iconContainer}>{leftIcon}</View>
        ) : null}
        <TextInput
          style={inputStyleResolved}
          placeholderTextColor={theme.inputPlaceholder}
          selectionColor="#6366f1"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...restProps}
        />
      </View>
      {error ? (
        <Text style={[styles.error, { color: '#ef4444' }]}>
          {error}
        </Text>
      ) : null}
      {!error && hint ? (
        <Text style={[styles.hint, { color: theme.textTertiary }]}>
          {hint}
        </Text>
      ) : null}
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
