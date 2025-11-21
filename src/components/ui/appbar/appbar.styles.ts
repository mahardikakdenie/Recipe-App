import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#388E3C',
    fontFamily: 'Inter_400Regular',
    fontWeight: '700'
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#1B5E20',
  },
  dateText: {
    fontSize: 14,
    color: '#66BB6A',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
    fontWeight: '800'
  },
  iconButton: {
    flexDirection: 'row',
    gap: 12,
  },
  saveIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  },
});

export default styles;
