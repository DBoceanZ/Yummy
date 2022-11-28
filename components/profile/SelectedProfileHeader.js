import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import styles from './styles';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { LightButton } from '../lib/buttons/CustomButton';
import axios from 'axios';

const SelectedProfileHeader = ({ handlers, navigation, selected_userid }) => {
  const { userData } = useGlobalContext();
  const { UID } = userData;
  const { handleFollowersTouch, handleFollowingTouch } = handlers;
  const [username, setUsername] = useState('ExampleUser');
  const [profilePhoto, setProfilePhoto] = useState('http://tinyurl.com/68dvbhaw');
  const [bio, setBio] = useState('');
  const [likes, setLikes] = useState(0);
  const [following, setFollowing] = useState(undefined);

  // follow button press handlers
  const handleFollowPress = () => {
    axios.post('http://18.212.89.94:3000/users/follow', {
      user_id: UID,
      followed_id: selected_userid
    })
      .then(() => {
        setFollowing(true);
      })
      .catch((err) => console.log(err));
  };

  const handleUnfollowPress = () => {
    axios.delete('http://18.212.89.94:3000/users/follow', {
      data: {
        user_id: UID,
        followed_id: selected_userid
      }})
      .then(() => {
        setFollowing(false);
      })
      .catch((err) => console.log(err));
  };

  // on page focus, fetch user profile data from database
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios.get(`http://18.212.89.94:3000/users/userData?user_id=${selected_userid}`)
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios.get(`http://18.212.89.94:3000/follows/following?user_following_id=${UID}`)
        .then((res) => {
          let isFollowing = false;
          res.data.forEach((user) => {
            if (user.id == selected_userid) {
              isFollowing = true;
            }
          })
          setFollowing(isFollowing);
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
        {
          following === undefined ? 
            <></> :
            following === false ?
              <LightButton onPress={() => handleFollowPress()} text='Follow'/> :
              <LightButton onPress={() => handleUnfollowPress()} text='Unfollow'/>
        }
      </View>
    </View>
  )
};

export default SelectedProfileHeader;
