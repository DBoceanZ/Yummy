import React, { useState } from 'react';
import styles from './styles';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { LightButton } from '../lib/buttons/CustomButton';
import * as ImagePicker from 'expo-image-picker';

const EditProfileHeader = () => {
  // TEMP
  const [image, setImage] = useState('http://tinyurl.com/68dvbhaw');
  const [displayName, setDisplayName] = useState('ExampleUser');
  const chooseImage = async () => {
    let result;
    try {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      });
    } catch (err) {
      console.log(err);
    }
    setImage(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => chooseImage()} style={styles.imageTouchable}>
          <Image style={styles.image} source={{uri: image}}></Image>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.displayName}>{displayName}</Text>
      </TouchableOpacity>
      <View style={styles.countersContainer}>
        <View style={styles.counterItem}>
          <Text style={styles.counter}>0</Text>
          <Text style={styles.counterLabel}>Following</Text>
        </View>
        <Text style={styles.counterDivider}>|</Text>
        <View style={styles.counterItem}>
          <Text style={styles.counter}>0</Text>
          <Text style={styles.counterLabel}>Followers</Text>
        </View>
        <Text style={styles.counterDivider}>|</Text>
        <View style={styles.counterItem}>
          <Text style={styles.counter}>0</Text>
          <Text style={styles.counterLabel}>Likes</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <LightButton text='Follow' />
      </View>
    </View>
  )
};

export default EditProfileHeader;
