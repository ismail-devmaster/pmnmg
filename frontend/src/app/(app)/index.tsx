import { Platform, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ThemedButton, ThemedInput, ProductCard } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { useTheme } from '@/hooks/use-theme';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';

export default function ProductListScreen() {
  const { user, logout } = useAuth();
  const { products, loading, refreshing, error, onRefresh, fetchProducts } = useProducts();
  const theme = useTheme();
  const [search, setSearch] = useState('');

  useFocusEffect(useCallback(() => { fetchProducts(); }, [fetchProducts]));

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <View style={[styles.loadingCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.dotRow}>
            {[1, 0.6, 0.3].map((opacity, i) => (
              <View key={i} style={[styles.dot, { opacity }]} />
            ))}
          </View>
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Loading products...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.greeting, { color: '#818cf8' }]}>
              {greeting()} {user?.name?.split(' ')[0] ?? ''}
            </Text>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Products</Text>
          </View>
          <ThemedButton title="Sign Out" onPress={logout} variant="ghost" size="small" fullWidth={false} />
        </View>
      </View>

      <View style={styles.countBar}>
        <Text style={[styles.countText, { color: theme.textTertiary }]}>
          {products.length} {products.length === 1 ? 'PRODUCT' : 'PRODUCTS'}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <ThemedInput
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
          leftIcon={<Text style={styles.searchIcon}>🔍</Text>}
          containerStyle={styles.searchInput}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={[styles.list, filtered.length === 0 && styles.listEmpty]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          error ? (
            <ErrorState error={error} onRetry={() => fetchProducts()} theme={theme} />
          ) : (
            <EmptyState search={search} theme={theme} />
          )
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" colors={['#6366f1']} />
        }
      />
    </View>
  );
}

function EmptyState({ search, theme }: { search: string; theme: Record<string, string> }) {
  return (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIcon, { backgroundColor: theme.bgElement, borderColor: theme.border }]}>
        <Text style={styles.emptyIconText}>📦</Text>
      </View>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>No products found.</Text>
      <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
        {search ? 'Try a different search term.' : 'Products will appear here once they are added.'}
      </Text>
    </View>
  );
}

function ErrorState({ error, onRetry, theme }: { error: string | null; onRetry: () => void; theme: Record<string, string> }) {
  return (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIcon, { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.25)' }]}>
        <Text style={[styles.emptyIconText, { color: '#ef4444' }]}>!</Text>
      </View>
      <Text style={[styles.emptyTitle, { color: '#ef4444' }]}>Something went wrong</Text>
      <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>{error || 'Failed to load products'}</Text>
      <ThemedButton title="Try Again" onPress={onRetry} variant="outline" size="medium" fullWidth={false} style={styles.retryBtn} />
    </View>
  );
}

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning,';
  if (hour < 18) return 'Good afternoon,';
  return 'Good evening,';
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 48, paddingBottom: Spacing.five,
    paddingHorizontal: Spacing.six, borderBottomWidth: 1,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  greeting: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: Spacing.one },
  headerTitle: { fontSize: 20, fontWeight: '700', letterSpacing: -0.3 },
  countBar: { paddingHorizontal: Spacing.six, paddingTop: Spacing.four, paddingBottom: Spacing.one },
  countText: { fontSize: 11, fontWeight: '700', letterSpacing: 2.5, textTransform: 'uppercase' },
  searchContainer: { paddingHorizontal: Spacing.six, paddingBottom: Spacing.two },
  searchInput: { marginBottom: 0 },
  searchIcon: { fontSize: 14 },
  list: { paddingHorizontal: Spacing.six, paddingBottom: Spacing.twenty, maxWidth: MaxContentWidth, alignSelf: 'center', width: '100%' },
  listEmpty: { flex: 1, justifyContent: 'center' },
  emptyContainer: { alignItems: 'center', paddingVertical: Spacing.twenty },
  emptyIcon: { width: 88, height: 88, borderRadius: Radius.full, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.six },
  emptyIconText: { fontSize: 32 },
  emptyTitle: { fontSize: 18, fontWeight: '600', marginBottom: Spacing.two },
  emptySubtitle: { fontSize: 14, textAlign: 'center', maxWidth: 280, lineHeight: 20 },
  retryBtn: { marginTop: Spacing.five, paddingHorizontal: Spacing.six },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingCard: { paddingHorizontal: Spacing.eight, paddingVertical: Spacing.six, borderRadius: Radius.xl, borderWidth: 1, alignItems: 'center' },
  dotRow: { flexDirection: 'row', gap: Spacing.two, marginBottom: Spacing.three },
  dot: { width: 8, height: 8, borderRadius: Radius.full, backgroundColor: '#6366f1' },
  loadingText: { fontSize: 14, letterSpacing: 0.5 },
});
