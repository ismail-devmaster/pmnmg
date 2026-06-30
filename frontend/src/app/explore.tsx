import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Elevation, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

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
      style={[styles.scrollView, { backgroundColor: '#F8F9FC' }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}
    >
      <ThemedView style={styles.container}>
        {/* Hero header */}
        <View style={styles.heroHeader}>
          <View style={styles.heroDot} />
          <ThemedText type="overline" themeColor="primary" style={styles.heroOverline}>
            Explore
          </ThemedText>
          <ThemedText type="headline" style={styles.heroTitle}>
            Build with Expo
          </ThemedText>
          <ThemedText
            type="body"
            themeColor="textSecondary"
            style={styles.heroDescription}
          >
            This starter app includes example code to help you get started
            building cross-platform apps.
          </ThemedText>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <ThemedView type="primary" style={styles.linkButton}>
                <ThemedText type="label" style={styles.linkButtonText}>
                  Expo Documentation
                </ThemedText>
                <SymbolView
                  tintColor="#FFFFFF"
                  name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                  size={12}
                />
              </ThemedView>
            </Pressable>
          </ExternalLink>
        </View>

        {/* Sections */}
        <View style={styles.sectionsWrapper}>
          <Collapsible title="File-based routing">
            <ThemedText type="caption">
              This app has two screens: <ThemedText type="code">src/app/index.tsx</ThemedText>{' '}
              and <ThemedText type="code">src/app/explore.tsx</ThemedText>
            </ThemedText>
            <ThemedText type="caption" style={styles.collapsibleGap}>
              The layout file in <ThemedText type="code">src/app/_layout.tsx</ThemedText> sets up
              the tab navigator.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="label" themeColor="primary">
                Learn more
              </ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Cross-platform support">
            <ThemedView type="backgroundElement" style={styles.collapsibleContent}>
              <ThemedText type="caption">
                You can open this project on Android, iOS, and the web. To open the web version,
                press <ThemedText type="bodyStrong">w</ThemedText> in the terminal running this
                project.
              </ThemedText>
              <Image
                source={require('@/assets/images/tutorial-web.png')}
                style={styles.imageTutorial}
              />
            </ThemedView>
          </Collapsible>

          <Collapsible title="Image assets">
            <ThemedText type="caption">
              For static images, you can use the <ThemedText type="code">@2x</ThemedText> and{' '}
              <ThemedText type="code">@3x</ThemedText> suffixes to provide files for different
              screen densities.
            </ThemedText>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.imageReact} />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <ThemedText type="label" themeColor="primary">
                Learn more
              </ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Theming">
            <ThemedText type="caption">
              This template has light and dark mode support. The{' '}
              <ThemedText type="code">useColorScheme()</ThemedText> hook lets you inspect the
              user&apos;s current color scheme, and adjust UI colors accordingly.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <ThemedText type="label" themeColor="primary">
                Learn more
              </ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Animations">
            <ThemedText type="caption">
              This template includes an example of an animated component. The{' '}
              <ThemedText type="code">src/components/ui/collapsible.tsx</ThemedText> component uses
              the <ThemedText type="code">react-native-reanimated</ThemedText> library to
              animate opening this hint.
            </ThemedText>
          </Collapsible>
        </View>

        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
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
    paddingVertical: Spacing.sixteen,
    gap: Spacing.three,
  },
  heroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
    marginBottom: Spacing.two,
  },
  heroOverline: {
    letterSpacing: 2,
  },
  heroTitle: {
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  heroDescription: {
    textAlign: 'center',
    maxWidth: 360,
    lineHeight: 24,
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.six,
    paddingVertical: Spacing.four,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    gap: Spacing.two,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  linkButtonText: {
    color: '#FFFFFF',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.six,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.sixteen,
  },
  collapsibleContent: {
    alignItems: 'center',
    borderRadius: Radius.lg,
  },
  collapsibleGap: {
    marginTop: Spacing.two,
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
});