import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ListItem from './ListItem.js';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalContext';


export default function Following({ navigation }) {
  const { userData, setUserData } = useGlobalContext();
  const { selectedUserID } = userData;
  const [followingList, setFollowingList] = useState([]);
  const test_id = 2;

  useEffect(() => {
    axios.get(`http://18.212.89.94:3000/follows/following?user_following_id=6`)
      .then(results => {
        setFollowingList(results.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  const handleProfileNavigation = (id) => {
    setUserData({ ...userData, selectedUserID: id })
    navigation.navigate('Profile');
  }

  const renderItem = ({ item }) => (
    <ListItem user={item} buttonName="Unfollow" handleProfileNavigation={handleProfileNavigation} />
  )
  return (
    <View>
      <FlatList data={followingList} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}