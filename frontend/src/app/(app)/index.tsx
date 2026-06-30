import { Platform, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import {
  ThemedView,
  ThemedText,
  ThemedButton,
  ProductCard,
} from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types';
import {
  Elevation,
  MaxContentWidth,
  PremiumPalette,
  Radius,
  Spacing,
} from '@/constants/theme';

export default function ProductListScreen() {
  const { user, logout } = useAuth();
  const { products, loading, refreshing, error, onRefresh, fetchProducts } =
    useProducts();

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [fetchProducts])
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <ThemedText type="display" style={styles.emptyIconText}>
          +
        </ThemedText>
      </View>
      <ThemedText type="titleSmall" style={styles.emptyTitle}>
        No products yet
      </ThemedText>
      <ThemedText
        type="body"
        themeColor="textSecondary"
        style={styles.emptySubtitle}
      >
        Products will appear here once they are added.
      </ThemedText>
    </View>
  );

  const renderError = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconCircle, styles.errorIconCircle]}>
        <ThemedText
          type="display"
          style={[styles.emptyIconText, styles.errorIconText]}
        >
          !
        </ThemedText>
      </View>
      <ThemedText
        type="titleSmall"
        themeColor="error"
        style={styles.emptyTitle}
      >
        Something went wrong
      </ThemedText>
      <ThemedText
        type="body"
        themeColor="textSecondary"
        style={styles.emptySubtitle}
      >
        {error || 'Failed to load products'}
      </ThemedText>
      <ThemedButton
        title="Try Again"
        onPress={() => fetchProducts()}
        variant="outline"
        size="medium"
        fullWidth={false}
        style={styles.retryButton}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedView
          type="card"
          style={[styles.loadingCard, Elevation.medium]}
        >
          <View style={styles.loadingDotRow}>
            <View style={[styles.loadingDot, styles.loadingDot1]} />
            <View style={[styles.loadingDot, styles.loadingDot2]} />
            <View style={[styles.loadingDot, styles.loadingDot3]} />
          </View>
          <ThemedText
            type="body"
            themeColor="textSecondary"
            style={styles.loadingText}
          >
            Loading products...
          </ThemedText>
        </ThemedView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Premium Header */}
      <View style={[styles.header, Elevation.low]}>
        <View style={styles.headerContent}>
          <View>
            <ThemedText type="overline" style={styles.headerGreeting}>
              {getGreeting()} {user?.name?.split(' ')[0] ?? ''}
            </ThemedText>
            <ThemedText type="headline" style={styles.headerTitle}>
              Products
            </ThemedText>
          </View>
          <ThemedButton
            title="Sign Out"
            onPress={logout}
            variant="ghost"
            size="small"
            fullWidth={false}
            style={styles.signOutButton}
          />
        </View>
      </View>

      {/* Product Count Bar */}
      <View style={styles.countBar}>
        <ThemedText
          type="labelSmall"
          themeColor="textTertiary"
          style={styles.countText}
        >
          {products.length} {products.length === 1 ? 'PRODUCT' : 'PRODUCTS'}
        </ThemedText>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={[
          styles.listContainer,
          products.length === 0 && styles.emptyList,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={error ? renderError : renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={PremiumPalette.champagneGold}
            colors={[PremiumPalette.champagneGold]}
          />
        }
      />
    </View>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning,';
  if (hour < 18) return 'Good afternoon,';
  return 'Good evening,';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PremiumPalette.pearl,
  },

  /* ── Header ─────────────────────────────────────────── */
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: Spacing.five,
    paddingHorizontal: Spacing.six,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
    backgroundColor: PremiumPalette.navy,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerGreeting: {
    letterSpacing: 1.5,
    marginBottom: Spacing.one,
    color: PremiumPalette.champagneGold,
  },
  headerTitle: {
    letterSpacing: -0.3,
    color: '#FFFFFF',
  },
  signOutButton: {
    opacity: 0.85,
  },

  /* ── Count Bar ──────────────────────────────────────── */
  countBar: {
    paddingHorizontal: Spacing.six,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
  },
  countText: {
    letterSpacing: 2.5,
    fontWeight: '600',
  },

  /* ── List ───────────────────────────────────────────── */
  listContainer: {
    paddingHorizontal: Spacing.six,
    paddingBottom: Spacing.twenty,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },

  /* ── Empty State ────────────────────────────────────── */
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.twenty,
  },
  emptyIconCircle: {
    width: 88,
    height: 88,
    borderRadius: Radius.full,
    backgroundColor: '#F0EDE6',
    borderWidth: 1.5,
    borderColor: PremiumPalette.champagneGoldLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.six,
  },
  emptyIconText: {
    color: PremiumPalette.champagneGold,
    fontSize: 36,
    fontWeight: '300',
  },
  emptyTitle: {
    marginBottom: Spacing.two,
    color: PremiumPalette.obsidian,
  },
  emptySubtitle: {
    textAlign: 'center',
    maxWidth: 280,
  },

  /* ── Error State ────────────────────────────────────── */
  errorIconCircle: {
    backgroundColor: PremiumPalette.warmRedLight,
    borderColor: PremiumPalette.warmRed,
  },
  errorIconText: {
    color: PremiumPalette.warmRed,
    fontWeight: '700',
  },
  retryButton: {
    marginTop: Spacing.five,
    paddingHorizontal: Spacing.six,
  },

  /* ── Loading State ──────────────────────────────────── */
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PremiumPalette.pearl,
  },
  loadingCard: {
    paddingHorizontal: Spacing.eight,
    paddingVertical: Spacing.six,
    borderRadius: Radius.xl,
    alignItems: 'center',
  },
  loadingDotRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: PremiumPalette.champagneGold,
    opacity: 0.3,
  },
  loadingDot1: { opacity: 1 },
  loadingDot2: { opacity: 0.6 },
  loadingDot3: { opacity: 0.3 },
  loadingText: {
    letterSpacing: 0.5,
  },
});
