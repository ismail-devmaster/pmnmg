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

interface FormErrors {
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
  const [errors, setErrors] = useState<FormErrors>({});
  const { register, loading } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Include uppercase, lowercase, and a number';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    await register({
      name: name.trim(),
      email: email.trim(),
      password,
      password_confirmation: password,
    });
  };

  return (
    <View style={styles.container}>
      {/* Decorative top area */}
      <View style={styles.heroSection}>
        <View style={[styles.heroBackground, styles.heroBackgroundAlt]} />
        <View style={styles.heroContent}>
          <View style={styles.heroRow}>
            <View style={[styles.brandMark, styles.brandMarkAlt]}>
              <ThemedText type="displayLarge" style={styles.brandLetter}>
                +
              </ThemedText>
            </View>
            <View style={styles.heroTextGroup}>
              <ThemedText type="headline" style={styles.heroTitle}>
                Create Account
              </ThemedText>
              <ThemedText type="body" style={styles.heroSubtitle}>
                Join as a client
              </ThemedText>
            </View>
          </View>
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
            <View style={styles.formBody}>
              <ThemedInput
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  clearError('name');
                }}
                error={errors.name}
                textContentType="name"
                autoComplete="name"
              />

              <ThemedInput
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  clearError('email');
                }}
                error={errors.email}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
              />

              <ThemedInput
                label="Password"
                placeholder="Min. 8 characters"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  clearError('password');
                }}
                error={errors.password}
                secureTextEntry
                textContentType="newPassword"
                autoComplete="new-password"
                hint="Must include uppercase, lowercase, and a number"
              />

              <ThemedInput
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  clearError('confirmPassword');
                }}
                error={errors.confirmPassword}
                secureTextEntry
                textContentType="newPassword"
                autoComplete="new-password"
              />

              <ThemedButton
                title="Create Account"
                onPress={handleRegister}
                loading={loading}
                variant="secondary"
                size="large"
                fullWidth
                style={styles.submitButton}
              />
            </View>
          </ThemedView>

          {/* Footer link */}
          <View style={styles.footer}>
            <ThemedText type="body" themeColor="textSecondary">
              Already have an account?{' '}
            </ThemedText>
            <Link href="/(auth)/login" asChild>
              <ThemedButton
                title="Sign In"
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: Spacing.six,
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
  heroBackgroundAlt: {
    backgroundColor: '#064E3B',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.five,
  },
  brandMark: {
    width: 56,
    height: 56,
    borderRadius: Radius.xl,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  brandMarkAlt: {},
  brandLetter: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 28,
  },
  heroTextGroup: {
    flex: 1,
  },
  heroTitle: {
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
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
  },
  formBody: {
    padding: Spacing.six,
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