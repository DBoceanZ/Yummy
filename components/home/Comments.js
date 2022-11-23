import React from 'react';
import { FlatList, StyleSheet, Text, View, Modal, Pressable, TextInput } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios'
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
  },
  inputContainer: {
    borderWidth: 5,
    borderColor: '#a0a0a0',
    borderRadius: 4,
    flexDirection: 'row',
  },
  inputComment: {
    flex: 1,
    height: 36,
    backgroundColor: '#fffa9c',
    borderWidth: 2,
    borderColor: '#1e232c',
    borderRadius: 4,
  }
})

export default function Comments({ comments, displayComments, setDisplayComments }) {
  const [ newComment, setNewComment ] = React.useState('');
  // const comments = [
  //   {
  //     'commenter_name': 'someUsername',
  //     comment: 'This is a vital comment',
  //     'created_at': Date.now() - 600000,
  //   },
  //   {
  //     'commenter_name': 'anotherUsername',
  //     comment: 'This comment is absolutely meaningless',
  //     'created_at': Date.now() - 1200000,
  //   },
  //   {
  //     'commenter_name': 'someUsername',
  //     comment: 'This is a vital comment',
  //     'created_at': Date.now() - 600000,
  //   },
  //   {
  //     'commenter_name': 'anotherUsername',
  //     comment: 'This comment is absolutely meaningless',
  //     'created_at': Date.now() - 1200000,
  //   },
  //   {
  //     'commenter_name': 'someUsername',
  //     comment: 'This is a vital comment',
  //     'created_at': Date.now() - 600000,
  //   },
  //   {
  //     'commenter_name': 'anotherUsername',
  //     comment: 'This comment is absolutely meaningless',
  //     'created_at': Date.now() - 1200000,
  //   }
  // ];
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
        <FontAwesome5 name="angle-down" size={36} color="#fff700" />
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
        <RenderHeader />
        <FlatList
          data={comments}
          renderItem={({item}) => <CommentCard comment={item} />}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputComment}
            onChangeText={setNewComment}
            value={newComment}
            maxLength={600}
          />
          <Pressable
            onPress={() => {
              axios.post('http://18.212.89.94:3000/video/comments', {
                'video_id': 1,
                'user_id': 1,
                comment: newComment
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                }
              })
            }}
          >
            <MaterialCommunityIcons name="message-plus-outline" size={36} color="#fff700" />
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}