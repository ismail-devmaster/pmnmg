import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, Link } from 'expo-router';
import api from '@/api/axios';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.post('/register', { name, email, password, password_confirmation: password });
      
      Alert.alert('Success', 'Account created! Please log in.');
      router.replace('/(auth)/login');
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      const msg = errors ? Object.values(errors).flat().join('\n') : 'Registration failed';
      Alert.alert('Registration Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Client Registration</Text>
      
      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>

      <Link href="/(auth)/login" asChild>
        <TouchableOpacity style={{ marginTop: 20 }}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
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
  button: { backgroundColor: '#34C759', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  linkText: { color: '#007AFF', textAlign: 'center', fontSize: 16 }
});