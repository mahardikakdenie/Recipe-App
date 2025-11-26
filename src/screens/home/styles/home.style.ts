// styles/home.styles.ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 30,
    paddingBottom: 100,
  },
  recommendationsScroll: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 10,
  },
  recommendationCard: {
    width: 160,
  },
  recommendationImage: {
    width: '100%',
    height: 180,
    justifyContent: 'flex-end',
    borderRadius: 16,
  },
  recommendationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderRadius: 16,
  },
  recommendationContent: {
    padding: 12,
  },
  recommendationTitle: {
    fontSize: 15,
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 2,
  },
  recommendationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  recommendationText: {
    fontSize: 12,
    opacity: 0.95,
  },
  menuList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  loadingMore: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
