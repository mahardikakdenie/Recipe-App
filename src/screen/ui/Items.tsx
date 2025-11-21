import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Item from './Item';
import { IRECIPE } from '@/src/types/recipe';
import SkeletonCard from '../loading/skeleton';

interface ItemsProps {
    entries: IRECIPE[],
    cardWidth: number;
    isLoading: boolean;
};

const Items = (props: ItemsProps) => {
    return (
        <View style={styles.container}>
            {
                props.isLoading ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} cardWidth={props.cardWidth} />) :
                props.entries.map((entry) => (
                    <Item key={entry.id} entry={entry} cardWidth={props.cardWidth} />
                ))
            }
        </View>
    );
};

export default Items;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    }
});
