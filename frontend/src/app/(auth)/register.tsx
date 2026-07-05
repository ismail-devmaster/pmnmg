import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { ThemedInput, ThemedButton } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const { register, loading } = useAuth();
  const theme = useTheme();

  const validate = (): boolean => {
    const e: Errors = {};

    if (!name.trim()) e.name = 'Name is required';
    else if (name.trim().length < 2) e.name = 'Name must be at least 2 characters';

    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email address';

    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'Password must be at least 8 characters';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      e.password = 'Include uppercase, lowercase, and a number';
    }

    if (!confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const clearError = (field: keyof Errors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleRegister = async () => {
    if (!validate()) return;
    await register({ name: name.trim(), email: email.trim(), password, password_confirmation: password });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: theme.text }]}>Create Account</Text>
              <Text style={[styles.formSubtitle, { color: theme.textSecondary }]}>Join as a client</Text>
            </View>

            <View style={styles.formBody}>
              <ThemedInput
                label="Name" placeholder="John Doe"
                value={name} onChangeText={(t) => { setName(t); clearError('name'); }}
                error={errors.name} textContentType="name" autoComplete="name"
              />

              <ThemedInput
                label="Email" placeholder="you@example.com"
                value={email} onChangeText={(t) => { setEmail(t); clearError('email'); }}
                error={errors.email} autoCapitalize="none" keyboardType="email-address"
                textContentType="emailAddress" autoComplete="email"
              />

              <ThemedInput
                label="Password" placeholder="Min. 8 characters"
                value={password} onChangeText={(t) => { setPassword(t); clearError('password'); }}
                error={errors.password} secureTextEntry
                textContentType="newPassword" autoComplete="new-password"
                hint="Must include uppercase, lowercase, and a number"
              />

              <ThemedInput
                label="Confirm Password" placeholder="Re-enter your password"
                value={confirmPassword} onChangeText={(t) => { setConfirmPassword(t); clearError('confirmPassword'); }}
                error={errors.confirmPassword} secureTextEntry
                textContentType="newPassword" autoComplete="new-password"
              />

              <ThemedButton title="Register" onPress={handleRegister} loading={loading} size="large" fullWidth />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textTertiary }]}>Already registered? </Text>
            <Link href="/(auth)/login" asChild>
              <ThemedButton title="Sign In" onPress={() => {}} variant="ghost" size="small" fullWidth={false} />
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: Spacing.six, paddingVertical: Spacing.twenty },
  card: { borderRadius: Radius.xl, borderWidth: 1, overflow: 'hidden' },
  formHeader: { paddingHorizontal: Spacing.six, paddingTop: Spacing.six, paddingBottom: Spacing.four },
  formTitle: { fontSize: 24, fontWeight: '700', letterSpacing: -0.3, marginBottom: Spacing.one },
  formSubtitle: { fontSize: 16, lineHeight: 24 },
  formBody: { paddingHorizontal: Spacing.six, paddingBottom: Spacing.six },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: Spacing.six },
  footerText: { fontSize: 14 },
});
