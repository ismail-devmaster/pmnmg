import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Product } from '@/types';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

function formatPrice(price: number): string {
  return price % 1 === 0 ? `$${price.toLocaleString()}` : `$${price.toFixed(2)}`;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.wrapper,
        { backgroundColor: theme.card, borderColor: theme.cardBorder },
        pressed && onPress && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(99, 102, 241, 0.15)', borderColor: 'rgba(99, 102, 241, 0.2)' }]}>
              <Text style={styles.iconText}>📦</Text>
            </View>
            <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
              {product.name}
            </Text>
          </View>
          <Text style={[styles.price, { color: '#818cf8' }]}>
            {formatPrice(product.price)}
          </Text>
        </View>

        {product.description && (
          <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={2}>
            {product.description}
          </Text>
        )}

        <View style={[styles.footer, { borderTopColor: theme.border }]}>
          <Text style={[styles.id, { color: theme.textTertiary }]}>
            #{String(product.id).padStart(4, '0')}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: Radius.xl,
    marginBottom: Spacing.three,
    borderWidth: 1,
  },
  pressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
  content: { padding: Spacing.five },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.three,
  },
  iconContainer: {
    width: 40, height: 40,
    borderRadius: Radius.xl, borderWidth: 1,
    justifyContent: 'center', alignItems: 'center',
  },
  iconText: { fontSize: 18 },
  name: {
    fontSize: 16, fontWeight: '600', letterSpacing: -0.3, flex: 1,
  },
  price: {
    fontSize: 14, fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  description: {
    fontSize: 14, lineHeight: 20,
    marginBottom: Spacing.three, marginLeft: 56,
  },
  footer: {
    flexDirection: 'row', justifyContent: 'flex-end',
    alignItems: 'center', borderTopWidth: 1,
    paddingTop: Spacing.three,
  },
  id: { fontSize: 12, fontWeight: '600', letterSpacing: 1 },
});
