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
import { Elevation, MaxContentWidth, Radius, Spacing } from '@/constants/theme';

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
      <View style={styles.emptyIcon}>
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
      <View style={[styles.emptyIcon, styles.errorIcon]}>
        <ThemedText type="display" style={[styles.emptyIconText, styles.errorIconText]}>
          !
        </ThemedText>
      </View>
      <ThemedText type="titleSmall" themeColor="error" style={styles.emptyTitle}>
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
        <ThemedView type="card" style={[styles.loadingCard, Elevation.medium]}>
          <ThemedText type="body" themeColor="textSecondary" style={styles.loadingText}>
            Loading products...
          </ThemedText>
        </ThemedView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <ThemedView type="backgroundElement" style={[styles.header, Elevation.low]}>
        <View style={styles.headerContent}>
          <View>
            <ThemedText type="overline" themeColor="primary" style={styles.headerGreeting}>
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
          />
        </View>
      </ThemedView>

      {/* Product count bar */}
      <View style={styles.countBar}>
        <ThemedText type="labelSmall" themeColor="textTertiary" style={styles.countText}>
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
            tintColor="#2563EB"
            colors={['#2563EB']}
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
    backgroundColor: '#F8F9FC',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: Spacing.five,
    paddingHorizontal: Spacing.six,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerGreeting: {
    letterSpacing: 1.5,
    marginBottom: Spacing.one,
  },
  headerTitle: {
    letterSpacing: -0.3,
  },
  countBar: {
    paddingHorizontal: Spacing.six,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
  },
  countText: {
    letterSpacing: 2,
  },
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
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.twenty,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: Radius.xxl,
    backgroundColor: '#EEF0F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.six,
  },
  emptyIconText: {
    color: '#9CA3AF',
    fontSize: 36,
    fontWeight: '300',
  },
  errorIcon: {
    backgroundColor: '#FEE2E2',
  },
  errorIconText: {
    color: '#DC2626',
    fontWeight: '700',
  },
  emptyTitle: {
    marginBottom: Spacing.two,
  },
  emptySubtitle: {
    textAlign: 'center',
    maxWidth: 280,
  },
  retryButton: {
    marginTop: Spacing.five,
    paddingHorizontal: Spacing.six,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
  },
  loadingCard: {
    paddingHorizontal: Spacing.eight,
    paddingVertical: Spacing.five,
    borderRadius: Radius.xl,
  },
  loadingText: {
    letterSpacing: 0.5,
  },
});