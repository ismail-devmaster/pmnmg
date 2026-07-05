import { useState } from 'react';
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
  label, error, hint, containerStyle, inputStyle, leftIcon,
  onFocus: onFocusProp, onBlur: onBlurProp, ...rest
}: ThemedInputProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error ? '#ef4444' : isFocused ? '#6366f1' : theme.inputBorder;
  const backgroundColor = isFocused ? theme.inputBackground : theme.backgroundSubtle;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>}
      <View style={[styles.wrapper, { backgroundColor, borderColor }]}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, leftIcon ? styles.inputWithIcon : undefined, { color: theme.text }, inputStyle]}
          placeholderTextColor={theme.inputPlaceholder}
          selectionColor="#6366f1"
          onFocus={(e) => { setIsFocused(true); onFocusProp?.(e); }}
          onBlur={(e) => { setIsFocused(false); onBlurProp?.(e); }}
          {...rest}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {!error && hint && <Text style={[styles.hint, { color: theme.textTertiary }]}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.five },
  label: { fontSize: 13, fontWeight: '600', marginBottom: Spacing.two, letterSpacing: 0.4, textTransform: 'uppercase' },
  wrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderRadius: Radius.lg, minHeight: 52 },
  iconLeft: { paddingLeft: Spacing.four },
  input: { flex: 1, paddingHorizontal: Spacing.four, paddingVertical: Spacing.four, fontSize: 16, lineHeight: 22 },
  inputWithIcon: { paddingLeft: Spacing.three },
  error: { fontSize: 12, fontWeight: '500', marginTop: Spacing.one, marginLeft: Spacing.one, color: '#ef4444' },
  hint: { fontSize: 12, marginTop: Spacing.one, marginLeft: Spacing.one },
});
