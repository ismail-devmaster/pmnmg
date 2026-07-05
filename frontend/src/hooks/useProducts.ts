import { useState, useCallback } from 'react';
import { Product } from '@/types';
import api from '@/api/axios';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError(null);

    try {
      const response = await api.get('/products');
      const data = response.data;
      setProducts(Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      if (showLoader) setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProducts(false);
  }, [fetchProducts]);

  return { products, loading, refreshing, error, fetchProducts, onRefresh };
}
