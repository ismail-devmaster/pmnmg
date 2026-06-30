import { Pressable, StyleSheet, View } from 'react-native';
import { Product } from '@/types';
import { ThemedView, ThemedText } from '@/components';
import { Elevation, Radius, Spacing } from '@/constants/theme';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

function formatPrice(price: number): string {
  return price % 1 === 0 ? `$${price.toLocaleString()}` : `$${price.toFixed(2)}`;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.wrapper,
        Elevation.medium,
        pressed && onPress && styles.pressed,
      ]}
    >
      <ThemedView type="card" style={styles.card}>
        {/* Accent top stripe */}
        <View style={styles.accentStripe} />

        <View style={styles.content}>
          {/* Header row */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <ThemedText
                type="titleSmall"
                style={styles.name}
                numberOfLines={1}
              >
                {product.name}
              </ThemedText>
            </View>
            <View style={styles.priceBadge}>
              <ThemedText
                type="bodyStrong"
                style={styles.priceText}
              >
                {formatPrice(product.price)}
              </ThemedText>
            </View>
          </View>

          {/* Description */}
          {product.description ? (
            <ThemedText
              type="body"
              themeColor="textSecondary"
              style={styles.description}
              numberOfLines={2}
            >
              {product.description}
            </ThemedText>
          ) : null}

          {/* Footer */}
          <View style={styles.footer}>
            <ThemedText
              type="caption"
              themeColor="textTertiary"
              style={styles.id}
            >
              #{String(product.id).padStart(4, '0')}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: Radius.lg,
    marginBottom: Spacing.four,
    backgroundColor: 'transparent',
  },
  card: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
  },
  accentStripe: {
    height: 3,
    backgroundColor: '#2563EB',
  },
  content: {
    padding: Spacing.five,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.three,
  },
  titleContainer: {
    flex: 1,
    marginRight: Spacing.four,
  },
  name: {
    letterSpacing: -0.2,
  },
  priceBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radius.sm,
  },
  priceText: {
    color: '#059669',
    fontWeight: '700',
    letterSpacing: 0,
  },
  description: {
    lineHeight: 22,
    marginBottom: Spacing.four,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F1F5',
    paddingTop: Spacing.three,
  },
  id: {
    fontWeight: '600',
    letterSpacing: 1,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
});