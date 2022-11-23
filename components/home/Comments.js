import React from 'react';
import { FlatList, StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import CommentCard from './CommentCard';

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    backgroundColor: '#1e232c',
    color: '#fff700',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  transparent: {
    flex: 0.4,
    backgroundColor: 'rgba(0,0,0,0)',
  }
})

export default function Comments({ displayComments, setDisplayComments }) {
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
    },
    {
      'commenter_name': 'someUsername',
      comment: 'This is a vital comment',
      'created_at': Date.now() - 600000,
    },
    {
      'commenter_name': 'anotherUsername',
      comment: 'This comment is absolutely meaningless',
      'created_at': Date.now() - 1200000,
    },
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
  const RenderHeader = () => {
    return (
      <Pressable
        onPress={() => {
          setDisplayComments(false);
        }}
        hitSlop={{
          top: 20,
          left: 30,
          right: 30,
        }}
        style={{alignItems: 'center'}}
      >
        <FontAwesome5 name="grip-lines" size={36} color="#fff700" />
      </Pressable>
    )
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
          ListHeaderComponent={RenderHeader}
          stickyHeaderIndices={[0]}
        />
      </View>
    </Modal>
  )
}