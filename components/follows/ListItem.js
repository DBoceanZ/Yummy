import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LightButton } from '../lib/buttons/CustomButton';

export default function ListItem({ user, buttonName, handleProfileNavigation }) {

  const handlePress = () => {
    handleProfileNavigation(user.id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img}></Image>
      </View>
      <TouchableOpacity onPress={handlePress}>
        <View>
          <Text style={styles.text}>{user.username}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.btnContainer}>
        <LightButton text={buttonName} />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 10
  },
  img: {
    borderRadius: 50,
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