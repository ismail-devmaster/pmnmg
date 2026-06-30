import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import { ThemedView, ThemedText, ThemedInput, ThemedButton } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { Elevation, Radius, Spacing } from '@/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, loading } = useAuth();

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
    <View style={styles.container}>
      {/* Decorative top area */}
      <View style={styles.heroSection}>
        <View style={styles.heroBackground} />
        <View style={styles.heroContent}>
          <View style={styles.brandMark}>
            <View style={styles.brandIcon}>
              <ThemedText type="displayLarge" style={styles.brandLetter}>
                P
              </ThemedText>
            </View>
          </View>
          <ThemedText type="display" style={styles.heroTitle}>
            Product
          </ThemedText>
          <ThemedText type="display" style={styles.heroTitleAccent}>
            Manager
          </ThemedText>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Form Card */}
          <ThemedView type="card" style={[styles.formCard, Elevation.high]}>
            <View style={styles.formHeader}>
              <ThemedText type="headline" style={styles.formTitle}>
                Welcome back
              </ThemedText>
              <ThemedText
                type="body"
                themeColor="textSecondary"
                style={styles.formSubtitle}
              >
                Sign in to your client account
              </ThemedText>
            </View>

            <View style={styles.formBody}>
              <ThemedInput
                label="Email"
                placeholder="you@example.com"
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
          </ThemedView>

          {/* Footer link */}
          <View style={styles.footer}>
            <ThemedText type="body" themeColor="textSecondary">
              Don&apos;t have an account?{' '}
            </ThemedText>
            <Link href="/(auth)/register" asChild>
              <ThemedButton
                title="Get Started"
                onPress={() => {}}
                variant="ghost"
                size="small"
                fullWidth={false}
              />
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  heroSection: {
    position: 'relative',
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: Spacing.eight,
    paddingHorizontal: Spacing.six,
    overflow: 'hidden',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1E3A5F',
    borderBottomLeftRadius: Radius.xxl,
    borderBottomRightRadius: Radius.xxl,
  },
  heroContent: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  brandMark: {
    marginBottom: Spacing.five,
  },
  brandIcon: {
    width: 72,
    height: 72,
    borderRadius: Radius.xl,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  brandLetter: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  heroTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '300',
    letterSpacing: -0.3,
  },
  heroTitleAccent: {
    color: '#FBBF24',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: -4,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.six,
    paddingTop: Spacing.five,
    paddingBottom: Spacing.twenty,
  },
  formCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  formHeader: {
    paddingHorizontal: Spacing.six,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.four,
  },
  formTitle: {
    letterSpacing: -0.3,
  },
  formSubtitle: {
    marginTop: Spacing.one,
  },
  formBody: {
    paddingHorizontal: Spacing.six,
    paddingBottom: Spacing.six,
  },
  submitButton: {
    marginTop: Spacing.two,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.six,
  },
});