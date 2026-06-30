import { useState, useCallback } from 'react';
import { Product } from '@/types';
import api from '@/api/axios';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  fetchProducts: (showLoader?: boolean) => Promise<void>;
  onRefresh: () => Promise<void>;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError(null);

    try {
      const response = await api.get('/products');
      const data = response.data.data ?? response.data;
      setProducts(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load products';
      setError(message);
      if (__DEV__) console.error('Fetch products error:', err);
    } finally {
      if (showLoader) setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProducts(false);
  }, [fetchProducts]);

  return {
    products,
    loading,
    refreshing,
    error,
    fetchProducts,
    onRefresh,
  };
}