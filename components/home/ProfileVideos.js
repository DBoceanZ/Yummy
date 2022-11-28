import * as React from 'react';
import axios from 'axios';
import { AntDesign, FontAwesome, Foundation } from '@expo/vector-icons';
import { useState, useEffect, useRef, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  StyleSheet,
  Button,
  Dimensions,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
  Animated,
  Image,
  Share,
  TouchableOpacity,
} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import Comments from './Comments';
import { LightButton } from '../lib/buttons/CustomButton.js';
import testpfp from './testmedia/testpfp.png';
import { Stack, IconButton } from '@react-native-material/core';
import { useGlobalContext } from '../../context/GlobalContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const mockUsername = 'user';
const mockDesc = 'this is the video description';

export default function ProfileVideos({ navigation }) {
  const videoref = React.useRef(null);
  const [ref, setref] = useState(null);
  const [status, setStatus] = React.useState({});
  const [displayComments, setDisplayComments] = React.useState(false);
  const { userData, setUserData, homeVideos, setHomeVideos } = useGlobalContext();
  const [focusedIndex, setFocusedIndex] = React.useState(homeVideos.index);
  const [refreshing, setRefreshing] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [aColor, setAColor] = React.useState('white');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //Every time the screen is focused the Video starts playing
      if (videoref) {
        videoref.current.playAsync();
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      //Every time the screen loses focus the Video is paused
      if (videoref) {
        videoref.current.pauseAsync();
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (status.isPlaying) {
      fadeOut();
    }
  }, [status.isPlaying]);

  function fadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function fadeOut() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }
  const handleScroll = useCallback(
    ({
      nativeEvent: {
        contentOffset: { y },
      },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = Math.round(y / windowHeight);

      setFocusedIndex(offset);
    },
    [setFocusedIndex]
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Comments
        displayComments={displayComments}
        setDisplayComments={setDisplayComments}
        comments={comments}
        setComments={setComments}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        disableIntervalMomentum={false}
        onScroll={handleScroll}
        snapToInterval={windowHeight}
        decelerationRate="fast"
        vertical
        contentOffset={{ x: 0, y: windowHeight * homeVideos.index }}
      >
        {homeVideos.videos.map((src, index) => (
          <View key={index}>
            <Pressable
              onPress={() =>
                status.isPlaying
                  ? (fadeIn(), videoref.current.pauseAsync())
                  : (fadeOut(), videoref.current.playAsync())
              }
            >
              <Video
                key={index}
                shouldPlay={focusedIndex === index}
                resizeMode="cover"
                ref={focusedIndex === index ? videoref : null}
                style={styles.video}
                source={{
                  uri: src,
                }}
                useNativeControls={false}
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
              <TouchableOpacity
                onPress={() => {
                  // set userid here later VVVVVVVV
                  setUserData({ ...userData });
                  navigation.navigate('Profile');
                }}
              >
                <Image source={testpfp} style={styles.pfp} />
              </TouchableOpacity>
              <Animated.View
                style={[
                  {
                    opacity,
                  },
                ]}
              >
                <Foundation style={styles.playBut} name="play" size={88} color="white" />
              </Animated.View>
              <AntDesign
                style={styles.heart}
                name="heart"
                size={32}
                color={aColor}
                onPress={() => {
                  axios
                    .post(
                      'http://18.212.89.94:3000/video/likes',
                      {
                        video_id: 1,
                        user_id: 1,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      }
                    )
                    .then((response) => {
                      console.log(response);
                      if (response.status === 201) {
                        console.log('success');
                        setAColor('red');
                        /*need to get like count again*/
                      } else {
                        console.log('failure');
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
              <Text style={styles.heartText}>0</Text>
              <FontAwesome
                style={styles.comment}
                name="commenting"
                size={38}
                color="white"
                onPress={() => {
                  axios
                    .get('http://18.212.89.94:3000/video/comments?video_id=1')
                    .then((response) => {
                      setComments(response.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  setDisplayComments(true);
                }}
              />
              <Text style={styles.commentText}>0</Text>
              <Pressable
                onPress={() => {
                  onShare(src);
                }}
              >
                <FontAwesome style={styles.share} name="share" size={34} color="white" />
              </Pressable>
              <Text style={styles.shareText}>0</Text>
              <Text style={styles.usernameText}>{mockUsername}</Text>
              <Text style={styles.descText}>{mockDesc}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    position: 'absolute',
    bottom: 370,
    right: 5,
  },
  heartText: {
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 350,
    right: 17,
    color: 'white',
  },
  comment: {
    position: 'absolute',
    bottom: 305,
    right: 5,
  },
  commentText: {
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 280,
    right: 17,
    color: 'white',
  },
  share: {
    position: 'absolute',
    bottom: 230,
    right: 5,
  },
  shareText: {
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 210,
    right: 17,
    color: 'white',
  },
  playBut: {
    margin: 50,
    bottom: 350,
    right: 110,
    position: 'absolute',
    opacity: 0.4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  playButContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  pfp: {
    bottom: 430,
    right: 5,
    width: 45,
    height: 45,
    borderRadius: 200 / 2,
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 1,
  },
  usernameText: {
    margin: 5,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 115,
    left: 5,
    color: 'white',
  },
  descText: {
    margin: 5,
    position: 'absolute',
    bottom: 85,
    left: 5,
    color: 'white',
  },
});
