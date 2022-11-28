import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ListItem from './ListItem.js';
import { useGlobalContext } from '../../context/GlobalContext';


export default function Followers({ navigation }) {
  const { userData, setUserData } = useGlobalContext();
  const { selectedUserID } = userData;
  const test_id = 6;

  useEffect(() => {
    axios.get(`http://18.212.89.94:3000/follows/following?user_following_id=${selectedUserID}`)
      .then(results => {
        console.log(results.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  const handleProfileNavigation = () => {
    setUserData({ ...userData, selectedUserID: test_id });
    navigation.navigate('Profile');
  }

  const renderItem = ({ item }) => (
    <ListItem user={item} buttonName={"Remove"} handleProfileNavigation={handleProfileNavigation} />
  )
  return (
    <View>
      <FlatList data={list} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}

// Temp sample data
const list = [
  { id: 0, username: 'Goku' },
  { id: 1, username: 'Gohan' },
  { id: 2, username: 'Goten' },
  { id: 3, username: 'Vegeta' },
  { id: 4, username: 'Trunks' },
  { id: 5, username: 'Broly' },
  { id: 6, username: 'Piccolo' },
  { id: 7, username: 'Frieza' },
  { id: 8, username: 'Bulma' },
  { id: 9, username: 'Bardock' }
];