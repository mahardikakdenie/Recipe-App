// app/recipe/[id]/index.tsx
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';

type RecipeDetailProps = object;

const RecipeDetail = (props: RecipeDetailProps) => {
  const {id} = useLocalSearchParams<{ id: string; }>();
  const navigation = useNavigation()

    // Opsional: ubah judul header dinamis
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `Recipe #${id}`,
    });
  }, [id, navigation]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Detail</Text>
      <Text>ID: {id}</Text>
    </View>
  );
};

export default RecipeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
