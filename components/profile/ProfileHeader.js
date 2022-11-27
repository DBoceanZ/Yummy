import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import styles from './styles';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { LightButton } from '../lib/buttons/CustomButton';
import axios from 'axios';

const ProfileHeader = ({ handlers }) => {
  const { userData } = useGlobalContext();
  const { UID, selectedUserID } = userData;
  const { 
    handleFollowersTouch, handleFollowingTouch, handleEditProfileTouch 
  } = handlers;
  const [username, setUsername] = useState('ExampleUser');
  const [profilePhoto, setProfilePhoto] = useState('http://tinyurl.com/68dvbhaw');
  const [bio, setBio] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  );

  // on initial render, fetch user profile data from database
  useEffect(() => {
    axios.get(`http://18.212.89.94:3000/users/userData?user_id=${selectedUserID}`)
      .then((res) => {
        setUsername(res.data.username);
        setBio(res.data.bio);
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
        <Image style={styles.image} source={{uri: profilePhoto}}></Image>
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
          <Text style={styles.counter}>0</Text>
          <Text style={styles.counterLabel}>Likes</Text>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bio}>{bio}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {UID === selectedUserID ? 
          <LightButton onPress={() => handleEditProfileTouch()} text='Edit Profile'/> :
          <LightButton text='Follow'/>
        }
      </View>
    </View>
  )
};

export default ProfileHeader;
