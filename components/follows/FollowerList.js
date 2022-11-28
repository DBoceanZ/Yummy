import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ListItem from './ListItem.js';
import { useGlobalContext } from '../../context/GlobalContext';
import axios from 'axios';


export default function Followers({ navigation }) {
  const { userData, setUserData } = useGlobalContext();
  const { selectedUserID } = userData;
  const [followerList, setFollowerList] = useState([]);
  const test_id = 1;

  useEffect(() => {
    axios.get(`http://18.212.89.94:3000/follows/followers?user_followed_id=3`)
      .then(results => {
        setFollowerList(results.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  const handleProfileNavigation = (id) => {
    setUserData({ ...userData, selectedUserID: id });
    navigation.navigate('Profile');
  }

  const renderItem = ({ item }) => (
    <ListItem user={item} buttonName={"Remove"} handleProfileNavigation={handleProfileNavigation} />
  )
  return (
    <View>
      <FlatList data={followerList} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}