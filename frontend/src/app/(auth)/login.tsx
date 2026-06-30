import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import { ThemedText, ThemedInput, ThemedButton } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import {
  PremiumPalette,
  Colors,
  Elevation,
  Radius,
  Spacing,
  Typography,
} from '@/constants/theme';

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
      {/* Premium Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroGradient} />
        <View style={styles.geometricOverlay}>
          <View style={styles.geoLine1} />
          <View style={styles.geoLine2} />
          <View style={styles.geoLine3} />
          <View style={styles.geoDot1} />
          <View style={styles.geoDot2} />
          <View style={styles.geoDot3} />
        </View>
        <View style={styles.heroContent}>
          <View style={styles.brandMark}>
            <ThemedText type="displayHero" style={styles.brandLetter}>
              P
            </ThemedText>
          </View>
          <View style={styles.titleGroup}>
            <ThemedText type="display" style={styles.heroTitleLight}>
              Product
            </ThemedText>
            <ThemedText type="display" style={styles.heroTitleGold}>
              Manager
            </ThemedText>
          </View>
          <ThemedText type="caption" style={styles.heroTagline}>
            Premium Client Management
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
          {/* Glass Form Card */}
          <View style={styles.formCardWrapper}>
            <View style={[styles.formCard, Elevation.elevated]}>
              <View style={styles.formHeader}>
                <ThemedText type="headline" style={styles.formTitle}>
                  Welcome back
                </ThemedText>
                <ThemedText
                  type="body"
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
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <ThemedText type="body" style={styles.footerText}>
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
    backgroundColor: Colors.light.background,
  },
  heroSection: {
    position: 'relative',
    paddingTop: Platform.OS === 'ios' ? 96 : 72,
    paddingBottom: Spacing.ten,
    paddingHorizontal: Spacing.six,
    overflow: 'hidden',
  },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: PremiumPalette.navy,
  },
  geometricOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  geoLine1: {
    position: 'absolute',
    top: 20,
    right: -40,
    width: 200,
    height: 1,
    backgroundColor: 'rgba(201, 169, 97, 0.12)',
    transform: [{ rotate: '-30deg' }],
  },
  geoLine2: {
    position: 'absolute',
    top: 60,
    right: -20,
    width: 160,
    height: 1,
    backgroundColor: 'rgba(201, 169, 97, 0.08)',
    transform: [{ rotate: '-30deg' }],
  },
  geoLine3: {
    position: 'absolute',
    bottom: 30,
    left: -30,
    width: 180,
    height: 1,
    backgroundColor: 'rgba(201, 169, 97, 0.1)',
    transform: [{ rotate: '30deg' }],
  },
  geoDot1: {
    position: 'absolute',
    top: 40,
    left: 30,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(201, 169, 97, 0.15)',
  },
  geoDot2: {
    position: 'absolute',
    top: 80,
    right: 50,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(201, 169, 97, 0.1)',
  },
  geoDot3: {
    position: 'absolute',
    bottom: 50,
    right: 80,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(201, 169, 97, 0.12)',
  },
  heroContent: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  brandMark: {
    width: 80,
    height: 80,
    borderRadius: Radius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: PremiumPalette.champagneGold,
    shadowColor: PremiumPalette.champagneGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: Spacing.five,
  },
  brandLetter: {
    color: PremiumPalette.champagneGold,
  },
  titleGroup: {
    alignItems: 'center',
  },
  heroTitleLight: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: -0.5,
  },
  heroTitleGold: {
    color: PremiumPalette.champagneGold,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginTop: -2,
  },
  heroTagline: {
    color: 'rgba(255, 255, 255, 0.45)',
    textAlign: 'center',
    marginTop: Spacing.three,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.six,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.twenty,
  },
  formCardWrapper: {
    marginTop: Spacing.three,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(232, 228, 220, 0.6)',
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
    color: Colors.light.textSecondary,
  },
  formBody: {
    paddingHorizontal: Spacing.six,
    paddingBottom: Spacing.six,
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
  footerText: {
    color: Colors.light.textSecondary,
  },
});
