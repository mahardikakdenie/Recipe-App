import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    // paddingTop: 20,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchBarWrapper: {
    // marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 10,
    padding: 5,
  },
  moodScroll: {
    height: 150,
    marginBottom: 28,
  },
  moodCard: {
    width: 200,
    borderRadius: 20,
    marginRight: 16,
    overflow: 'hidden',
  },
  moodImageContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  moodImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.85,
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  moodSubtitle: {
    fontSize: 13,
    opacity: 0.9,
    marginBottom: 8,
  },
  moodRecipe: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
    fontFamily: 'Inter_400Regular',
  },
});

export default styles;
