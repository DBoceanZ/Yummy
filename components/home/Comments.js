import React from 'react';
import { FlatList, StyleSheet, Text, View, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import CommentCard from './CommentCard';

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    backgroundColor: '#1e232c',
    color: '#B4be00',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  transparent: {
    flex: 0.4,
    backgroundColor: 'rgba(0,0,0,0)',
  }
})

export default function Comments({ displayComments }) {
  const comments = [
    {
      'commenter_name': 'someUsername',
      comment: 'This is a vital comment',
      'created_at': Date.now() - 600000,
    },
    {
      'commenter_name': 'anotherUsername',
      comment: 'This comment is absolutely meaningless',
      'created_at': Date.now() - 1200000,
    }
  ];
  const renderHeader = () => {
    return <FontAwesome5 name="grip-lines" size={24} color="black" />
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      visible={displayComments}
    >
      <View style={styles.transparent} />
      <View style={styles.container}>
        <FlatList
          data={comments}
          renderItem={({item}) => <CommentCard comment={item} />}
          ListHeaderComponent={<FontAwesome5 name="grip-lines" size={24} color="#B4be00" style={{alignSelf: 'center'}} />}
        />
      </View>
    </Modal>
  )
}