import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Followers() {
  return (
    <View style={styles.container}>
      <Text>Followers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});