import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ListItem from './ListItem.js';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalContext';


export default function Following({ navigation }) {
  const { userData, setUserData } = useGlobalContext();
  const { UID } = userData;
  const [followingList, setFollowingList] = useState([]);

  const handleProfileNavigation = (id) => {
    setUserData({ ...userData, UID: id })
    navigation.navigate('Profile');
  }

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      axios.get(`http://18.212.89.94:3000/follows/following?user_following_id=${UID}`)
        .then(results => {
          setFollowingList(results.data)
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return unsubscribe;
  }, [navigation])


  const renderItem = ({ item }) => (
    <ListItem user={item} btn1="Unfollow" btn2="Follow" handleProfileNavigation={handleProfileNavigation} />
  )
  return (
    <View>
      <FlatList data={followingList} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}