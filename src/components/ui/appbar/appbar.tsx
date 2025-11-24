// AppBar.tsx
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View } from 'react-native';
import useAppBarHooks from './useAppbar.hooks';
import styles from './appbar.styles';

const AppBar = () => {
  const {
    savedCount,
    greeting,
    currentDate,
    user,
    isSearhPage,
  } = useAppBarHooks();

  if (isSearhPage) {
    return (
      <View style={styles.headerProfile}>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={[styles.name, { fontSize: 25, width: '80%', }]}>What would you cook today?</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color="#2E7D32" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.headerProfile}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color="#2E7D32" />
        </View>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={[styles.name, { fontSize: 15 }]}>
            {user?.email ?? 'Guest'}
          </Text>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
      </View>

      <View style={styles.iconButton}>
        <Ionicons name="notifications-outline" size={28} color="#1B5E20" />
        <View style={styles.saveIconContainer}>
          <Ionicons name="bookmark" size={28} color="#1B5E20" />
          {savedCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{savedCount}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default AppBar;
