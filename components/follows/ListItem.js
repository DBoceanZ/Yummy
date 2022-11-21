import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LightButton } from '../lib/buttons/CustomButton';

export default function ListItem({ username }) {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img}></Image>
      </View>
      <View>
        <Text style={styles.text}>{username}</Text>
      </View>
      <View style={styles.btnContainer}>
        <LightButton text='Unfollow' />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    margin: 10
  },
  img: {
    borderRadius: '50%',
    backgroundColor: '#000',
    marginRight: 20,
    width: 50,
    height: 50,
  },
  text: {
    fontWeight: 'bold'
  },
  btnContainer: {
    position: 'absolute',
    right: 20
  }
});