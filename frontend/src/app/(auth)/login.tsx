import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { ThemedInput, ThemedButton } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, loading } = useAuth();
  const theme = useTheme();

  const validate = (): boolean => {
    let valid = true;

    if (!email.trim()) { setEmailError('Email is required'); valid = false; }
    else if (!/\S+@\S+\.\S+/.test(email)) { setEmailError('Enter a valid email address'); valid = false; }
    else setEmailError('');

    if (!password.trim()) { setPasswordError('Password is required'); valid = false; }
    else if (password.length < 6) { setPasswordError('Password must be at least 6 characters'); valid = false; }
    else setPasswordError('');

    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    await login({ email, password });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Brand */}
          <View style={styles.brand}>
            <View style={styles.brandIcon}>
              <Text style={styles.brandIconText}>🛡️</Text>
            </View>
            <Text style={[styles.brandName, { color: theme.text }]}>Product Manager</Text>
          </View>

          {/* Welcome */}
          <View style={styles.welcomeSection}>
            <Text style={[styles.welcomeTitle, { color: theme.text }]}>Welcome back</Text>
            <Text style={[styles.welcomeSubtitle, { color: theme.textSecondary }]}>
              Sign in to your client account
            </Text>
          </View>

          {/* Form */}
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <View style={styles.formBody}>
              <ThemedInput
                label="Email Address"
                placeholder="client@app.com"
                value={email}
                onChangeText={(text) => { setEmail(text); if (emailError) setEmailError(''); }}
                error={emailError}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
              />

              <ThemedInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => { setPassword(text); if (passwordError) setPasswordError(''); }}
                error={passwordError}
                secureTextEntry
                textContentType="password"
                autoComplete="current-password"
              />

              <ThemedButton title="Sign In" onPress={handleLogin} loading={loading} size="large" fullWidth />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textTertiary }]}>Don't have an account? </Text>
            <Link href="/(auth)/register" asChild>
              <ThemedButton title="Register" onPress={() => {}} variant="ghost" size="small" fullWidth={false} />
            </Link>
          </View>

          <Text style={[styles.disclaimer, { color: theme.textTertiary }]}>
            Client portal — For authorized users only
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.six,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: Spacing.twenty,
  },
  brand: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.ten, gap: Spacing.three },
  brandIcon: {
    width: 48, height: 48, borderRadius: Radius.xl, backgroundColor: '#6366f1',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
  },
  brandIconText: { fontSize: 24 },
  brandName: { fontSize: 24, fontWeight: '700', letterSpacing: -0.3 },
  welcomeSection: { marginBottom: Spacing.eight },
  welcomeTitle: { fontSize: 28, fontWeight: '700', letterSpacing: -0.3, marginBottom: Spacing.two },
  welcomeSubtitle: { fontSize: 16, lineHeight: 24 },
  card: { borderRadius: Radius.xl, borderWidth: 1, overflow: 'hidden' },
  formBody: { padding: Spacing.six },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: Spacing.six },
  footerText: { fontSize: 12 },
  disclaimer: { textAlign: 'center', marginTop: Spacing.three, fontSize: 12 },
});
