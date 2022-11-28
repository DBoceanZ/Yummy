import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import styles from './styles';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { LightButton } from '../lib/buttons/CustomButton';
import axios from 'axios';

const ProfileHeader = ({ handlers, navigation }) => {
  const { userData } = useGlobalContext();
  const { UID } = userData;
  const { 
    handleFollowersTouch, handleFollowingTouch, handleEditProfileTouch 
  } = handlers;
  const [username, setUsername] = useState('ExampleUser');
  const [profilePhoto, setProfilePhoto] = useState('http://tinyurl.com/68dvbhaw');
  const [bio, setBio] = useState('');
  const [likes, setLikes] = useState(0);

  // on page focus, fetch user profile data from database
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios.get(`http://18.212.89.94:3000/users/userData?user_id=${UID}`)
      .then((res) => {
        setUsername(res.data.username);
        setBio(res.data.bio);
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
      .catch((err) => console.log(err));
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.imageProfile} source={{uri: profilePhoto}}></Image>
      </View>
      <Text style={styles.username}>{username}</Text>
      <View style={styles.countersContainer}>
        <View style={styles.counterItem}>
          <TouchableOpacity onPress={() => handleFollowingTouch()}>
            <Text style={styles.counter}>0</Text>
            <Text style={styles.counterLabel}>Following</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.counterDivider}>|</Text>
        <View style={styles.counterItem}>
          <TouchableOpacity onPress={() => handleFollowersTouch()}>
            <Text style={styles.counter}>0</Text>
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
        <Text style={styles.bio}>{bio}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <LightButton onPress={() => handleEditProfileTouch()} text='Edit Profile'/>
      </View>
    </View>
  )
};

export default ProfileHeader;
