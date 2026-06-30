import { Redirect } from 'expo-router';
import { ThemedView, ThemedText } from '@/components';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText type="body" themeColor="textSecondary">
          Loading...
        </ThemedText>
      </ThemedView>
    );
  }

  return <Redirect href={isAuthenticated ? '/(app)' : '/(auth)/login'} />;
}