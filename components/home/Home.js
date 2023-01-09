import * as React from 'react';
import axios from 'axios';
import { AntDesign, FontAwesome, Foundation, Entypo } from '@expo/vector-icons';
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
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const onShare = async (url) => {
  try {
    const result = await Share.share({
      message: `check out this video from Yummy! ${url.video_url}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export default function Home({ navigation }) {
  const videoref = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [displayComments, setDisplayComments] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [aColor, setAColor] = React.useState('white');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const opacity = useState(new Animated.Value(0))[0];
  const { userData, setUserData } = useGlobalContext();
  const [videoList, setVideoList] = useState([]);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    axios.get('https://yummy-production.up.railway.app/videos/home').then((result) => {
      console.log(result.data);
      setVideoList(shuffle(result.data));
    });
  }, []);

  useEffect(() => {
    if (videoList.length > 0) {
      const unsubscribe = navigation.addListener('focus', () => {
        //Every time the screen is focused the Video starts playing
        if (videoref) {
          videoref.current.playAsync();
        }
      });
      return unsubscribe;
    }
  }, [navigation]);

  useEffect(() => {
    if (videoList.length > 0) {
      const unsubscribe = navigation.addListener('blur', () => {
        //Every time the screen loses focus the Video is paused
        if (videoref) {
          console.log('entered');
          videoref.current.pauseAsync();
        }
      });

      return unsubscribe;
    }
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
    }) => {
      const offset = Math.round(y / windowHeight);

      setFocusedIndex(offset);
    },
    [setFocusedIndex]
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    axios
      .get('https://yummy-production.up.railway.app/videos/home')
      .then((result) => {
        setVideoList(shuffle(result.data));
      })
      .catch((err) => {
        console.log(err);
      });
    setRefreshing(false);
  }, []);
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
        snapToInterval={windowHeight - 80}
        decelerationRate="fast"
        vertical
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {videoList.map((src, index) => (
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
                  uri: src.video_url,
                }}
                useNativeControls={false}
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
              <TouchableOpacity
                onPress={() => {
                  // set userid here later VVVVVVVV
                  setUserData({ ...userData });
                  navigation.navigate('Selected Profile', {
                    selected_userid: src.creator_id,
                  });
                }}
              >
                <Image
                  source={{
                    uri: src.profile_photo_url
                      ? src.profile_photo_url
                      : 'https://cdn.discordapp.com/attachments/1042963648731164704/1046858787463643176/unknown.png',
                  }}
                  style={styles.pfp}
                />
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
                      'https://yummy-production.up.railway.app/video/likes',
                      {
                        video_id: 1,
                        user_id: userData.UID,
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
                      } else {
                        console.log('failure');
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />

              <Text style={styles.heartText}>{src.likes}</Text>
              <FontAwesome
                style={styles.comment}
                name="commenting"
                size={34}
                color="white"
                onPress={() => {
                  axios
                    .get('https://yummy-production.up.railway.app/video/comments?video_id=1')
                    .then((response) => {
                      setComments(response.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  setDisplayComments(true);
                }}
              />
              <Text style={styles.commentText}>{src.comment_count}</Text>
              <Pressable
                onPress={() => {
                  onShare(src);
                }}
              >
                <FontAwesome style={styles.share} name="share" size={34} color="white" />
              </Pressable>
              <Text style={styles.shareText}>0</Text>
              <Pressable
                onPress={() => {
                  setUserData({ ...userData });
                  navigation.navigate('Selected Profile', {
                    selected_userid: src.creator_id,
                  });
                }}
              >
                <Text style={styles.usernameText}>{src.created_by}</Text>
              </Pressable>
              <Text style={styles.descText}>{src.summary}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <MaterialCommunityIcons
        onPress={() => {
          navigation.navigate('Search');
        }}
        style={styles.searchBut}
        name="magnify"
        size={34}
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    flex: 1,
    width: windowWidth,
    height: windowHeight - 80,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    position: 'absolute',
    bottom: windowHeight / 2.6,
    right: 5,
  },
  heartText: {
    fontWeight: 'bold',
    position: 'absolute',
    bottom: windowHeight / 2.8,
    right: 17,
    color: 'white',
  },
  comment: {
    position: 'absolute',
    bottom: windowHeight / 3.25,
    right: 5,
  },
  commentText: {
    fontWeight: 'bold',
    position: 'absolute',
    bottom: windowHeight / 3.6,
    right: 17,
    color: 'white',
  },
  share: {
    position: 'absolute',
    bottom: windowHeight / 4.5,
    right: 5,
  },
  shareText: {
    fontWeight: 'bold',
    position: 'absolute',
    bottom: windowHeight / 5,
    right: 17,
    color: 'white',
  },
  playBut: {
    margin: 50,
    bottom: windowWidth / 1.35,
    right: windowWidth / 3,
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
    justifyContent: 'center',
  },
  pfp: {
    bottom: windowHeight / 2.2,
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
    bottom: 45,
    left: 5,
    color: 'white',
  },
  descText: {
    margin: 5,
    position: 'absolute',
    bottom: 20,
    left: 5,
    color: 'white',
    width: windowWidth / 1.3,
  },
  searchBut: {
    position: 'absolute',
    top: 50,
    right: 10,
  },
});
