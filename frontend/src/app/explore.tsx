import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { Collapsible } from '@/components/ui/collapsible';
import { useTheme } from '@/hooks/use-theme';
import {
  BottomTabInset,
  MaxContentWidth,
  Radius,
  Spacing,
} from '@/constants/theme';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.four,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.sixteen,
      paddingBottom: Spacing.eight,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}
    >
      <View style={styles.container}>
        {/* Hero header */}
        <View style={styles.heroHeader}>
          <View style={[styles.heroDot, { backgroundColor: '#6366f1' }]} />
          <Text style={[styles.heroOverline, { color: '#818cf8' }]}>
            EXPLORE
          </Text>
          <Text style={[styles.heroTitle, { color: theme.text }]}>
            Build with Expo
          </Text>
          <Text style={[styles.heroDescription, { color: theme.textSecondary }]}>
            This starter app includes example code to help you get started
            building cross-platform apps.
          </Text>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <View style={styles.linkButton}>
                <Text style={styles.linkButtonText}>
                  Expo Documentation
                </Text>
                <SymbolView
                  tintColor="#0a0a1a"
                  name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                  size={12}
                />
              </View>
            </Pressable>
          </ExternalLink>
        </View>

        {/* Sections */}
        <View style={styles.sectionsWrapper}>
          <Collapsible title="File-based routing">
            <Text style={[styles.collapsibleText, { color: theme.textSecondary }]}>
              This app has two screens: <Text style={styles.code}>src/app/index.tsx</Text>{' '}
              and <Text style={styles.code}>src/app/explore.tsx</Text>
            </Text>
            <Text style={[styles.collapsibleText, { color: theme.textSecondary, marginTop: Spacing.two }]}>
              The layout file in <Text style={styles.code}>src/app/_layout.tsx</Text> sets up
              the tab navigator.
            </Text>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <Text style={[styles.learnMore, { color: '#818cf8' }]}>
                Learn more
              </Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Cross-platform support">
            <View style={[styles.collapsibleContent, { backgroundColor: '#12122b', borderColor: 'rgba(99, 102, 241, 0.12)' }]}>
              <Text style={[styles.collapsibleText, { color: theme.textSecondary }]}>
                You can open this project on Android, iOS, and the web. To open the web version,
                press <Text style={styles.codeBold}>w</Text> in the terminal running this
                project.
              </Text>
              <Image
                source={require('@/assets/images/tutorial-web.png')}
                style={styles.imageTutorial}
              />
            </View>
          </Collapsible>

          <Collapsible title="Image assets">
            <Text style={[styles.collapsibleText, { color: theme.textSecondary }]}>
              For static images, you can use the <Text style={styles.code}>@2x</Text> and{' '}
              <Text style={styles.code}>@3x</Text> suffixes to provide files for different
              screen densities.
            </Text>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.imageReact} />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <Text style={[styles.learnMore, { color: '#818cf8' }]}>
                Learn more
              </Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Theming">
            <Text style={[styles.collapsibleText, { color: theme.textSecondary }]}>
              This template has light and dark mode support. The{' '}
              <Text style={styles.code}>useColorScheme()</Text> hook lets you inspect the
              user&apos;s current color scheme, and adjust UI colors accordingly.
            </Text>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <Text style={[styles.learnMore, { color: '#818cf8' }]}>
                Learn more
              </Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Animations">
            <Text style={[styles.collapsibleText, { color: theme.textSecondary }]}>
              This template includes an example of an animated component. The{' '}
              <Text style={styles.code}>src/components/ui/collapsible.tsx</Text> component uses
              the <Text style={styles.code}>react-native-reanimated</Text> library to
              animate opening this hint.
            </Text>
          </Collapsible>
        </View>

        {Platform.OS === 'web' && (
          <View style={styles.webBadge}>
            <Text style={[styles.webBadgeText, { color: theme.textTertiary }]}>
              Expo SDK 52
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  heroHeader: {
    alignItems: 'center',
    paddingHorizontal: Spacing.six,
    paddingTop: Spacing.twenty,
    paddingBottom: Spacing.twelve,
    gap: Spacing.three,
  },
  heroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: Spacing.two,
  },
  heroOverline: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  heroDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 360,
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.six,
    paddingVertical: Spacing.four,
    borderRadius: Radius.lg,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    gap: Spacing.two,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  linkButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.six,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.sixteen,
  },
  collapsibleText: {
    fontSize: 14,
    lineHeight: 22,
  },
  code: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    color: '#818cf8',
  },
  codeBold: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    fontWeight: '700',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    color: '#818cf8',
  },
  learnMore: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: Spacing.two,
  },
  collapsibleContent: {
    alignItems: 'center',
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.four,
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Radius.lg,
    marginTop: Spacing.three,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: Spacing.three,
  },
  webBadge: {
    alignItems: 'center',
    paddingVertical: Spacing.six,
  },
  webBadgeText: {
    fontSize: 12,
  },
});
