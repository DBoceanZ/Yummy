import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const Comments = () => {
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
  return (
    <view style={styles.container}>
      <FlatList
        data={comments}
        renderItem={({item}) => <CommentCard comment={item} />}
      />
    </view>
  )
}