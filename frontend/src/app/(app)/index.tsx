import { Platform, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ThemedButton, ThemedInput, ProductCard } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { useTheme } from '@/hooks/use-theme';
import {
  MaxContentWidth,
  Radius,
  Spacing,
} from '@/constants/theme';

export default function ProductListScreen() {
  const { user, logout } = useAuth();
  const { products, loading, refreshing, error, onRefresh, fetchProducts } =
    useProducts();
  const theme = useTheme();

  const [search, setSearch] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [fetchProducts])
  );

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderProduct = ({ item }: { item: typeof products[0] }) => (
    <ProductCard product={item} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconCircle, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
        <Text style={styles.emptyIconText}>📦</Text>
      </View>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>
        No products found.
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
        {search ? 'Try a different search term.' : 'Products will appear here once they are added.'}
      </Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconCircle, { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.25)' }]}>
        <Text style={[styles.emptyIconText, { color: '#ef4444' }]}>!</Text>
      </View>
      <Text style={[styles.emptyTitle, { color: '#ef4444' }]}>
        Something went wrong
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
        {error || 'Failed to load products'}
      </Text>
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
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <View style={[styles.loadingCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.loadingDotRow}>
            <View style={[styles.loadingDot, styles.loadingDot1]} />
            <View style={[styles.loadingDot, styles.loadingDot2]} />
            <View style={[styles.loadingDot, styles.loadingDot3]} />
          </View>
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            Loading products...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={[styles.headerGreeting, { color: '#818cf8' }]}>
              {getGreeting()} {user?.name?.split(' ')[0] ?? ''}
            </Text>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Products</Text>
          </View>
          <ThemedButton
            title="Sign Out"
            onPress={logout}
            variant="ghost"
            size="small"
            fullWidth={false}
          />
        </View>
      </View>

      {/* Product Count */}
      <View style={styles.countBar}>
        <Text style={[styles.countText, { color: theme.textTertiary }]}>
          {products.length} {products.length === 1 ? 'PRODUCT' : 'PRODUCTS'}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <ThemedInput
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
          leftIcon={<Text style={styles.searchIcon}>🔍</Text>}
          containerStyle={styles.searchInput}
        />
      </View>

      {/* Product List — read-only, no edit/delete */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={[
          styles.listContainer,
          filteredProducts.length === 0 && styles.emptyList,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={error ? renderError : renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6366f1"
            colors={['#6366f1']}
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
  },

  /* ── Header ─────────────────────────────────────────── */
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: Spacing.five,
    paddingHorizontal: Spacing.six,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.12)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerGreeting: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: Spacing.one,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },

  /* ── Count Bar ──────────────────────────────────────── */
  countBar: {
    paddingHorizontal: Spacing.six,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.one,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },

  /* ── Search ─────────────────────────────────────────── */
  searchContainer: {
    paddingHorizontal: Spacing.six,
    paddingBottom: Spacing.two,
  },
  searchInput: {
    marginBottom: 0,
  },
  searchIcon: {
    fontSize: 14,
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
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.six,
  },
  emptyIconText: {
    fontSize: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Spacing.two,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },

  /* ── Error State ────────────────────────────────────── */
  retryButton: {
    marginTop: Spacing.five,
    paddingHorizontal: Spacing.six,
  },

  /* ── Loading State ──────────────────────────────────── */
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCard: {
    paddingHorizontal: Spacing.eight,
    paddingVertical: Spacing.six,
    borderRadius: Radius.xl,
    borderWidth: 1,
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
    backgroundColor: '#6366f1',
    opacity: 0.3,
  },
  loadingDot1: { opacity: 1 },
  loadingDot2: { opacity: 0.6 },
  loadingDot3: { opacity: 0.3 },
  loadingText: {
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
