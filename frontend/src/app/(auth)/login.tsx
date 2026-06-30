import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import { ThemedInput, ThemedButton } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/use-theme';
import {
  PremiumPalette,
  Radius,
  Spacing,
} from '@/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, loading } = useAuth();
  const theme = useTheme();

  const validateForm = (): boolean => {
    let valid = true;
    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    await login({ email, password });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Background noise texture overlay */}
      <View style={styles.noiseOverlay} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoiding}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Mobile Brand Header */}
          <View style={styles.mobileBrand}>
            <View style={styles.brandIconContainer}>
              <Text style={styles.brandIconText}>🛡️</Text>
            </View>
            <Text style={[styles.brandName, { color: theme.text }]}>
              Product Manager
            </Text>
          </View>

          {/* Welcome Header */}
          <View style={styles.welcomeHeader}>
            <Text style={[styles.welcomeTitle, { color: theme.text }]}>
              Welcome back
            </Text>
            <Text style={[styles.welcomeSubtitle, { color: theme.textSecondary }]}>
              Sign in to your client account
            </Text>
          </View>

          {/* Login Form Card */}
          <View style={[styles.formCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <View style={styles.formBody}>
              <ThemedInput
                label="Email Address"
                placeholder="client@app.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                }}
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
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError('');
                }}
                error={passwordError}
                secureTextEntry
                textContentType="password"
                autoComplete="current-password"
              />

              <ThemedButton
                title="Sign In"
                onPress={handleLogin}
                loading={loading}
                variant="primary"
                size="large"
                fullWidth
                style={styles.submitButton}
              />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textTertiary }]}>
              Don&apos;t have an account?{' '}
            </Text>
            <Link href="/(auth)/register" asChild>
              <ThemedButton
                title="Register"
                onPress={() => {}}
                variant="ghost"
                size="small"
                fullWidth={false}
              />
            </Link>
          </View>

          <View style={styles.footerBottom}>
            <Text style={[styles.footerText, { color: theme.textTertiary }]}>
              Client portal — For authorized users only
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noiseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
    backgroundColor: 'transparent',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.six,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: Spacing.twenty,
  },
  mobileBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.ten,
    gap: Spacing.three,
  },
  brandIconContainer: {
    width: 48,
    height: 48,
    borderRadius: Radius.xl,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  brandIconText: {
    fontSize: 24,
  },
  brandName: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  welcomeHeader: {
    marginBottom: Spacing.eight,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: Spacing.two,
  },
  welcomeSubtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  formCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  formBody: {
    padding: Spacing.six,
  },
  submitButton: {
    marginTop: Spacing.three,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.six,
  },
  footerBottom: {
    alignItems: 'center',
    marginTop: Spacing.three,
  },
  footerText: {
    fontSize: 12,
    letterSpacing: 0.2,
  },
});
