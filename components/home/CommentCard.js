import React from 'react';
import { Text, View } from 'react-native';

const CommentCard = ({ comment }) => {
  return (
    <View>
      <View>
        <Text>
          {comment.commenter_name}
        </Text>
        <Text>
          {comment.created_at}
        </Text>
      </View>
      <Text>{comment.comment}</Text>
    </View>
  )
}