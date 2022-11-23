import React, { useState } from 'react';
import styles from './styles';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { LightButton } from '../lib/buttons/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { CLOUDINARY_NAME, CLOUDINARY_UPLOAD_PRESET } from '@env';

const EditProfileHeader = () => {
  const [image, setImage] = useState('http://tinyurl.com/68dvbhaw'); // TEMP
  const [displayName, setDisplayName] = useState('ExampleUser'); // TEMP
  
  // pick image from phone gallery and prepare image data to upload to cloudinary
  const pickFromGallery = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    if (!data.canceled) {
      setImage(data.assets[0].uri);
      let newFile = {
        uri:data.assets[0].uri,
        type:`test/${data.assets[0].uri.split(".")[1]}`,
        name:`test.${data.assets[0].uri.split(".")[1]}`};
      handleUpload(newFile);
    }
  };

  // upload image to cloudinary and console.log the returned url
  const handleUpload = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    data.append('cloud_name', CLOUDINARY_NAME);
    axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, data)
      .then(res => res.json())
      .then(data => console.log('data: ', data.secure_url))
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => pickFromGallery()} style={styles.imageTouchable}>
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
