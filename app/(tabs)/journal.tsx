import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type JournalProps = object

const Journal = (props: JournalProps) => {
  return (
    <View style={styles.container}>
      <Text>Journal</Text>
    </View>
  );
};

export default Journal;

const styles = StyleSheet.create({
  container: {}
});
