import { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import api from '@/api/axios';
import { removeToken } from '@/utils/storage';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

export default function ProductListScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  // Fetch products from API
  const fetchProducts = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data.data || response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load products. Please try again.');
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  // ✅ Refresh when screen comes into focus (e.g., after login)
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  // Pull-to-refresh functionality
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProducts(false);
    setRefreshing(false);
  }, []);

  // ✅ Logout logic - fixed navigation
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await api.post('/logout');
    } catch (error) {
      console.log('Logout API error (proceeding with local logout):', error);
    } finally {
      await removeToken();
      
      // ✅ FIX: Clear stack then navigate to login so user can't go back
      if (router.canDismiss?.()) {
        router.dismissAll();
      }
      router.replace('/(auth)/login');
      
      // Don't setLoggingOut(false) here - component unmounts anyway
    }
  };

  const renderItem = ({ item }: { item: Product }) => <ProductCard product={item} />;

  const renderEmpty = () => (
    <View style={styles.centered}>
      <Text style={styles.emptyText}>No products available right now.</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Logout */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Available Products</Text>
        <TouchableOpacity onPress={handleLogout} disabled={loggingOut} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>{loggingOut ? '...' : 'Logout'}</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007AFF" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutBtn: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});