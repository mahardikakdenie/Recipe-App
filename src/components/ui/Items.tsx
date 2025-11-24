// src/components/ui/Items.tsx
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { IRECIPE } from '@/src/types/recipe';
import Item from '@/src/components/ui/Item';
import SkeletonCard from '@/src/components/loading/skeleton';
import { useRouter } from 'expo-router';

interface ItemsProps {
  entries: IRECIPE[];
  cardWidth: number;
  isLoading: boolean;
}

const Items = (props: ItemsProps) => {
  const { entries, cardWidth, isLoading } = props;
  const router = useRouter();

  return (
    <View style={styles.container}>
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <View key={i} style={styles.itemWrapper}>
              <SkeletonCard cardWidth={cardWidth} />
            </View>
          ))
        : entries.map((entry) => (
            <TouchableOpacity onPress={() => {
                if (entry && entry.id) {
                    router.push(`/recipe/${entry.id}`)
                }
            }} key={entry.id} style={styles.itemWrapper}>
              <Item entry={entry} cardWidth={cardWidth} />
            </TouchableOpacity>
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
