import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LightButton } from '../lib/buttons/CustomButton';

export default function ListItem({ user, btn1, btn2, handleProfileNavigation }) {

  const [follow, setFollow] = useState(true)

  const handlePress = () => {
    handleProfileNavigation(user.id);
  }

  const handleButtonPress = () => {
    setFollow(!follow)
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: user.profile_photo_url }}></Image>
      </View>
      <TouchableOpacity onPress={handlePress}>
        <View>
          <Text style={styles.text}>{user.username}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.btnContainer}>
        <LightButton text={follow ? btn1 : btn2} onPress={handleButtonPress} />
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