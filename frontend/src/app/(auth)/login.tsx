import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, Link } from 'expo-router';
import api from '@/api/axios';
import { saveToken, saveUser } from '@/utils/storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      const { token, user } = response.data;

      // 🔒 STRICT CONSTRAINT: Block Admin access on mobile
      if (user.role === 'admin') {
        Alert.alert(
          'Access Denied', 
          'Admin access is restricted to the web application only. Please use the web portal to manage products and users.'
        );
        return; // Do NOT save token. User stays on login screen.
      }

      // ✅ Only save token & route if Client
      await saveToken(token);
      await saveUser(user);

    router.replace('/(app)');


    } catch (error: any) {
      const msg = error.response?.data?.message || error.response?.data?.errors?.email?.[0] || 'Network error. Please try again.';
      Alert.alert('Login Failed', msg);
    } finally {
      setLoading(false);
     
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Manager</Text>
      <Text style={styles.subtitle}>Client Login</Text>
      
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <Link href="/(auth)/register" asChild>
        <TouchableOpacity style={{ marginTop: 20 }}>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 32 },
  input: { backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  linkText: { color: '#007AFF', textAlign: 'center', fontSize: 16 }
});