import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from '@env';
import { useGlobalContext } from '../../context/GlobalContext';
import { Feather } from '@expo/vector-icons';

const EditProfileHeader = ({ handlers }) => {
  const { userData } = useGlobalContext();
  const { UID } = userData;
  const [profilePhoto, setProfilePhoto] = useState('http://tinyurl.com/68dvbhaw'); // TEMP
  const [username, setUsername] = useState('ExampleUser'); // TEMP
  const [bio, setBio] = useState('');
  const [likes, setLikes] = useState(0);
  const { handleFollowingTouch, handleFollowersTouch } = handlers;

  // pick image from phone gallery and prepare image data to upload to cloudinary
  const pickFromGallery = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!data.canceled) {
      setProfilePhoto(data.assets[0].uri);
      let newFile = {
        uri: data.assets[0].uri,
        type: `test/${data.assets[0].uri.split('.')[1]}`,
        name: `test.${data.assets[0].uri.split('.')[1]}`,
      };
      handleUpload(newFile);
    }
  };

  // upload image to cloudinary and PUT image url to database
  const handleUpload = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'yummy_upload');
    data.append('cloud_name', CLOUDINARY_CLOUD_NAME);
    axios
      .post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, data)
      .then((res) => {
        axios.put('https://yummy-production.up.railway.app/users/userData', {
          user_id: UID,
          profile_photo_url: res.data.secure_url,
        });
      })
      .catch((err) => console.log(err));
  };

  // on bio submit, PUT bio changes to database
  const handleBioSubmit = () => {
    axios
      .put(`https://yummy-production.up.railway.app/users/userData?user_id=${UID}`, {
        user_id: UID,
        bio: bio,
      })
      .catch((err) => console.log(err));
  };

  // on initial render, fetch user profile data from the database
  useEffect(() => {
    axios
      .get(`https://yummy-production.up.railway.app/users/userData?user_id=${UID}`)
      .then((res) => {
        setUsername(res.data.username);
        if (res.data.bio) {
          setBio(res.data.bio);
        }
        if (res.data.profile_photo_url) {
          setProfilePhoto(res.data.profile_photo_url);
        }
        if (res.data.videos) {
          let videoLikes = res.data.videos
            .map((video) => {
              return video.likes;
            })
            .reduce((a, b) => a + b, 0);
          setLikes(videoLikes);
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
          <Image style={styles.imageEdit} source={{ uri: profilePhoto }} />
          <View style={styles.imageOverlay} />
          <Feather name="camera" size={26} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.username}>{username}</Text>
      <View style={styles.countersContainer}>
        <View style={styles.counterItem}>
          <TouchableOpacity onPress={() => handleFollowingTouch()}>
            <Text style={styles.counter}>1</Text>
            <Text style={styles.counterLabel}>Following</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.counterDivider}>|</Text>
        <View style={styles.counterItem}>
          <TouchableOpacity onPress={() => handleFollowersTouch()}>
            <Text style={styles.counter}>2</Text>
            <Text style={styles.counterLabel}>Followers</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.counterDivider}>|</Text>
        <View style={styles.counterItem}>
          <Text style={styles.counter}>{likes}</Text>
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
            placeHolder={'Tap to add a bio!'}
            value={bio}
          ></TextInput>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileHeader;
