import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ListItem from './ListItem.js';


export default function Followers() {
  const renderItem = ({ item }) => (
    <ListItem user={item} buttonName={"Remove"} />
  )
  return (
    <View>
      <FlatList data={list} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}

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