import * as React from 'react';
import { View, StyleSheet } from 'react-native';

type SkeletonCardProps = {
  cardWidth: number;
};

const SkeletonCard = ({ cardWidth }: SkeletonCardProps) => {
  return (
    <View style={[styles.skeletonCard, { width: cardWidth, height: cardWidth }]}>
      <View style={styles.imagePlaceholder} />

      <View style={styles.overlay} />

      <View style={styles.badgePlaceholder} />

      <View style={styles.contentPlaceholder}>
        <View style={[styles.line, { width: '80%', height: 16, marginBottom: 8 }]} />
        <View style={styles.metaRow}>
          <View style={[styles.metaItem, { width: 60 }]} />
          <View style={[styles.metaItem, { width: 55 }]} />
        </View>
        <View style={styles.footer}>
          <View style={[styles.line, { width: 50, height: 14 }]} />
          <View style={styles.heartPlaceholder} />
        </View>
      </View>
    </View>
  );
};

export default SkeletonCard;

const styles = StyleSheet.create({
  skeletonCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F9FAFB',
    position: 'relative',
    shadowRadius: 6,
  },
  imagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: '#EDF0F2',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: 'rgba(181, 184, 192, 0.4)',
  },
  badgePlaceholder: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 70,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', 
    borderRadius: 12,
  },
  contentPlaceholder: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
  },
  line: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', 
    borderRadius: 4,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  metaItem: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heartPlaceholder: {
    width: 28,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 14,
  },
});
