// src/components/ui/Items.tsx
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { IRECIPE } from '@/src/types/recipe';
import Item from '@/src/components/ui/Item';
import SkeletonCard from '@/src/components/loading/skeleton';

interface ItemsProps {
  entries: IRECIPE[];
  cardWidth: number;
  isLoading: boolean;
}

const Items = (props: ItemsProps) => {
  const { entries, cardWidth, isLoading } = props;

  return (
    <View style={styles.container}>
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <View key={i} style={styles.itemWrapper}>
              <SkeletonCard cardWidth={cardWidth} />
            </View>
          ))
        : entries.map((entry) => (
            <View key={entry.id} style={styles.itemWrapper}>
              <Item entry={entry} cardWidth={cardWidth} />
            </View>
          ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  itemWrapper: {
    width: '48%', // ~2 kolom dengan jarak kecil
    marginBottom: 20,
  },
});

export default Items;
