import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { formatDistanceToNow, parseISO } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: 150,
    backgroundColor: '#ffc874',
    marginBottom: 10,
    borderRadius: 6,
    width: '96%',
    alignSelf: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  },
});

export default function CommentCard({ comment }) {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.commenterStyles}>{comment.username}</Text>
        <Text style={styles.dateStyles}>
          {formatDistanceToNow(parseISO(comment.created_at))}
          &nbsp;ago
        </Text>
      </View>
      <Text style={styles.commentStyles}>{comment.comment}</Text>
    </View>
  );
}
