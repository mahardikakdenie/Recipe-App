import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type RecipeScreenProps =  object;

const RecipeScreen = (props: RecipeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>This is Recipe Page</Text>
    </View>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  }
});
