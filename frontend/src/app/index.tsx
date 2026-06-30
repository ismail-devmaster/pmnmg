import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/storage';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      setHasToken(!!token);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return null;

  return <Redirect href={hasToken ? '/(app)' : '/(auth)/login'} />;
}