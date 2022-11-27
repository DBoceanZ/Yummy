import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { CLOUDINARY_NAME, CLOUDINARY_UPLOAD_PRESET } from '@env';
import { useGlobalContext } from '../../context/GlobalContext';

const EditProfileHeader = () => {
  const { userData } = useGlobalContext(); 
  const { selectedUserID } = userData;
  const [profilePhoto, setProfilePhoto] = useState('http://tinyurl.com/68dvbhaw'); // TEMP
  const [username, setUsername] = useState('ExampleUser'); // TEMP
  const [bio, setBio] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  ); // TEMP
  
  // pick image from phone gallery and prepare image data to upload to cloudinary
  const pickFromGallery = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    if (!data.canceled) {
      setProfilePhoto(data.assets[0].uri);
      let newFile = {
        uri:data.assets[0].uri,
        type:`test/${data.assets[0].uri.split(".")[1]}`,
        name:`test.${data.assets[0].uri.split(".")[1]}`};
      handleUpload(newFile);
    }
  };

  // upload image to cloudinary and PUT image url to database
  const handleUpload = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    data.append('cloud_name', CLOUDINARY_NAME);
    axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, data)
      .then(res => res.json())
      .then(data => {
        axios.put('http://18.212.89.94:3000/users/userData', {
          user_id: selectedUserID,
          profile_photo_url: data.secure_url
        })
      })
      .catch((err) => console.log(err));
  };

  // on bio submit, PUT bio changes to database
  const handleBioSubmit = () => {
    axios.put(`http://18.212.89.94:3000/users/userData?user_id=${selectedUserID}`, {
      user_id: selectedUserID,
      bio: bio
    })
      .catch((err) => console.log(err));
  };

  // on initial render, fetch user profile data from the database
  useEffect(() => {
    axios.get(`http://18.212.89.94:3000/users/userData?user_id=${selectedUserID}`)
      .then((res) => {
        setUsername(res.data.username);
        if (res.data.bio) {
          setBio(res.data.bio);
        }
        if (res.data.profile_photo_url) {
          setProfilePhoto(res.data.profile_photo_url);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => pickFromGallery()} style={styles.imageTouchable}>
          <Image style={styles.image} source={{uri: profilePhoto}}></Image>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.username}>{username}</Text>
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
      <View style={styles.bioContainer}>
        <TouchableOpacity>
          <TextInput 
            onChangeText={setBio}
            onSubmitEditing={() => handleBioSubmit()}
            blurOnSubmit={true}
            multiline={true} 
            style={styles.bio} 
            value={bio}>
          </TextInput>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default EditProfileHeader;
