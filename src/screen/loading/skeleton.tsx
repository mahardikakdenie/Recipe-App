import * as React from 'react';
import { View, StyleSheet } from 'react-native';

type SkeletonCardProps = {
  cardWidth: number;
};

const SkeletonCard = ({ cardWidth }: SkeletonCardProps) => {
  return (
    <View style={[styles.skeletonCard, { width: cardWidth, height: cardWidth }]}>
      {/* Placeholder gambar */}
      <View style={styles.imagePlaceholder} />

      {/* Overlay gelap (simulasi) */}
      <View style={styles.overlay} />

      {/* Badge kategori */}
      <View style={styles.badgePlaceholder} />

      {/* Konten bawah */}
      <View style={styles.contentPlaceholder}>
        {/* Judul */}
        <View style={[styles.line, { width: '80%', height: 16, marginBottom: 8 }]} />
        {/* Meta row */}
        <View style={styles.metaRow}>
          <View style={[styles.metaItem, { width: 60 }]} />
          <View style={[styles.metaItem, { width: 55 }]} />
        </View>
        {/* Footer: rating + heart */}
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
    backgroundColor: '#F5F5F5',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  imagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: '#EEEEEE',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  badgePlaceholder: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 70,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
  },
  contentPlaceholder: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
  },
  line: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 4,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  metaItem: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
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
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 14,
  },
});
