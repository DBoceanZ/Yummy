import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: 150,
    backgroundColor: '#B4be00',
    marginBottom: 10,
    borderRadius: 6,
    width: '96%',
    alignSelf: 'center'
  },
  detailsContainer: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  commenterStyles: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  dateStyles: {
    color: 'black',
  },
  commentStyles: {
    color: 'black',
    fontSize: 16,
  }
})

export default function CommentCard({ comment }) {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.commenterStyles}>
          {comment.commenter_name}
        </Text>
        <Text style={styles.dateStyles}>
          {comment.created_at}
        </Text>
      </View>
      <Text style={styles.commentStyles}>{comment.comment}</Text>
    </View>
  )
}