import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
export default function Construction() {
  return (
    <View>
      <Image style={styles.construction} source={require('./assets/construction.jpeg')} />
    </View>
  );
}

const styles = StyleSheet.create({
  construction: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    height: 750,
    width: 375,
  },
});
