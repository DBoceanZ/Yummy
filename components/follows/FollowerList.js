import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ListItem from './ListItem.js';
import { useGlobalContext } from '../../context/GlobalContext';
import axios from 'axios';


export default function Followers({ navigation }) {
  const { userData, setUserData } = useGlobalContext();
  const { UID } = userData;
  const [followerList, setFollowerList] = useState([]);

  const handleProfileNavigation = (id) => {
    setUserData({ ...userData, UID: id });
    navigation.navigate('Profile');
  }

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      axios.get(`http://18.212.89.94:3000/follows/followers?user_followed_id=${UID}`)
        .then(results => {
          setFollowerList(results.data)
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return unsubscribe;
  }, [navigation])


  const renderItem = ({ item }) => (
    <ListItem user={item} btn1="Remove" btn2="Allow" handleProfileNavigation={handleProfileNavigation} />
  )
  return (
    <View>
      <FlatList data={followerList} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}