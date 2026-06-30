import { View, Text, StyleSheet } from 'react-native';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${parseFloat(product.price as string).toFixed(2)}</Text>
      </View>
      {product.description ? (
        <Text style={styles.description}>{product.description}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android Shadow
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#34C759', // Green for price
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
