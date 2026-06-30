import { Pressable, StyleSheet, View } from 'react-native';
import { Product } from '@/types';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import {
  Elevation,
  Radius,
  Spacing,
  PremiumPalette,
  Colors,
} from '@/constants/theme';

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
        Elevation.high,
        pressed && onPress && styles.pressed,
      ]}
    >
      <ThemedView type="card" style={styles.card}>
        <View style={styles.accentStripe} />

        <View style={styles.content}>
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

          <View style={styles.footer}>
            <ThemedText
              type="caption"
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
    borderRadius: Radius.xl,
    marginBottom: Spacing.four,
    backgroundColor: 'transparent',
  },
  card: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  accentStripe: {
    height: 3,
    backgroundColor: PremiumPalette.champagneGold,
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
    letterSpacing: -0.3,
    fontWeight: '600',
  },
  priceBadge: {
    backgroundColor: PremiumPalette.champagneGold,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radius.sm,
  },
  priceText: {
    color: Colors.light.onSecondary,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  description: {
    lineHeight: 24,
    marginBottom: Spacing.four,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.light.borderLight,
    paddingTop: Spacing.three,
  },
  id: {
    color: PremiumPalette.champagneGold,
    fontWeight: '600',
    letterSpacing: 1,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
});
