import { Text, View, ScrollView, Image, Pressable } from 'react-native';

import React from 'react';
import useSummaryCardHooks from './useSummaryCard';
import styles from './summary.styles';

type SummaryCardsProps = object;

const SummaryCards = (props: SummaryCardsProps) => {
  const {
    activeIndex,
    setActiveIndex,
    summaries,
    width,
  } = useSummaryCardHooks();
  
    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContainer}
                onScroll={(e) => {
                    const x = e.nativeEvent.contentOffset.x;
                    const index = Math.round(x / (width * 0.9));
                    setActiveIndex(index);
                }}
                scrollEventThrottle={16}
            >
                {summaries.map((card) => (
                    <View key={card.id} style={[styles.mainCard, { width: width * 0.9 }]}>
                        <View style={styles.cardContent}>
                            <View style={styles.badgeHighlight}>
                                <Text style={styles.badgeTextSmall}>{card.badge}</Text>
                            </View>
                            <Text style={styles.cardTitle}>{card.title}</Text>
                            <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                            <Pressable style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.9 }]}>
                                <Text style={styles.actionButtonText}>{card.buttonText}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={{ uri: card.image }}
                                style={styles.chefImage}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.dotsContainer}>
                {summaries.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            i === activeIndex ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>

        </View>
    );
};

export default SummaryCards;
