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
  ...props
}: ThemedInputProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.inputBackground,
            borderColor: error
              ? theme.inputError
              : theme.inputBorder,
          },
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
          selectionColor={theme.primary}
          {...props}
        />
      </View>
      {error && (
        <Text style={[styles.error, { color: theme.inputError }]}>
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
    fontSize: 14,
    fontWeight: '600',
    marginBottom: Spacing.two,
    letterSpacing: 0.1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Radius.md,
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