import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { Collapsible } from '@/components/ui/collapsible';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={{ bottom: insets.bottom + Spacing.four }}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.dot, { backgroundColor: '#6366f1' }]} />
          <Text style={[styles.overline, { color: '#818cf8' }]}>EXPLORE</Text>
          <Text style={[styles.title, { color: theme.text }]}>Build with Expo</Text>
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            This starter app includes example code to help you get started building cross-platform apps.
          </Text>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <View style={styles.linkButton}>
                <Text style={styles.linkButtonText}>Expo Documentation</Text>
                <SymbolView tintColor="#0a0a1a" name="link" size={12} />
              </View>
            </Pressable>
          </ExternalLink>
        </View>

        {/* Collapsible Sections */}
        <View style={styles.sections}>
          <Collapsible title="File-based routing">
            <Text style={[styles.body, { color: theme.textSecondary }]}>
              This app has two screens:{' '}
              <Text style={styles.code}>src/app/index.tsx</Text> and{' '}
              <Text style={styles.code}>src/app/explore.tsx</Text>
            </Text>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <Text style={[styles.link, { color: '#818cf8' }]}>Learn more</Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Cross-platform support">
            <Text style={[styles.body, { color: theme.textSecondary }]}>
              Press <Text style={styles.codeBold}>w</Text> in the terminal to open the web version.
            </Text>
          </Collapsible>

          <Collapsible title="Theming">
            <Text style={[styles.body, { color: theme.textSecondary }]}>
              Use <Text style={styles.code}>useColorScheme()</Text> to adapt UI colors.
            </Text>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <Text style={[styles.link, { color: '#818cf8' }]}>Learn more</Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Animations">
            <Text style={[styles.body, { color: theme.textSecondary }]}>
              The <Text style={styles.code}>Collapsible</Text> component uses{' '}
              <Text style={styles.code}>react-native-reanimated</Text> for animations.
            </Text>
          </Collapsible>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  container: { paddingHorizontal: Spacing.six, paddingTop: Spacing.twenty, paddingBottom: Spacing.twenty },
  header: { alignItems: 'center', marginBottom: Spacing.eight, gap: Spacing.three },
  dot: { width: 6, height: 6, borderRadius: 3 },
  overline: { fontSize: 11, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', letterSpacing: -0.5 },
  description: { fontSize: 16, lineHeight: 24, textAlign: 'center', maxWidth: 360 },
  pressed: { opacity: 0.7 },
  linkButton: {
    flexDirection: 'row', paddingHorizontal: Spacing.six, paddingVertical: Spacing.four,
    borderRadius: Radius.lg, backgroundColor: '#6366f1', gap: Spacing.two, alignItems: 'center', marginTop: Spacing.two,
  },
  linkButtonText: { color: '#FFFFFF', fontWeight: '600' },
  sections: { gap: Spacing.five },
  body: { fontSize: 14, lineHeight: 22 },
  code: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 13,
    backgroundColor: 'rgba(99, 102, 241, 0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, color: '#818cf8',
  },
  codeBold: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 13, fontWeight: '700',
    backgroundColor: 'rgba(99, 102, 241, 0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, color: '#818cf8',
  },
  link: { fontSize: 14, fontWeight: '600', marginTop: Spacing.two },
});
