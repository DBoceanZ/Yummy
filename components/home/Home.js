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
import ReadMore from '@fawazahmed/react-native-read-more';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const urls = [
  {
    video_url:
      'https://res.cloudinary.com/dzuekop5v/video/upload/v1669610582/xy2fh6mvmsmrdrtkc5bm.mov',
    UID: 1,
    username: 'kyle',
    description: 'this has got to be the best food I have ever made!! sooooo good',
    profile_photo_url: 'https://i.pinimg.com/550x/31/ce/d6/31ced66059145d6721c1b379fb38551c.jpg',
  },
  {
    video_url:
      'https://res.cloudinary.com/dzuekop5v/video/upload/v1669610659/fa6cx9gyitugkioimheh.mov',
    UID: 1,
    username: 'not kyle',
    description: 'this is my description not that long but its decent length. great recipe!',
    profile_photo_url:
      'https://www.boredpanda.com/blog/wp-content/uploads/2015/09/post-the-happiest-dogs-who-show-the-best-smiles-163__700.jpg',
  },
];
const mockUsername = 'user';
const mockDesc = 'this is the video description';

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
    }) => {
      const offset = Math.round(y / windowHeight);

      setFocusedIndex(offset);
    },
    [setFocusedIndex]
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    axios
      .get('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json')
      .then((response) => {
        console.log(response);
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
        snapToInterval={windowHeight}
        decelerationRate="fast"
        vertical
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {urls.map((src, index) => (
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
                    selected_userid: 1,
                  });
                }}
              >
                <Image source={{ uri: src.profile_photo_url }} style={styles.pfp} />
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
              {/* <LottieView
                style={styles.heartLottie}
                source={require('./assets/like.json')}
                autoPlay
              /> */}
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
                size={34}
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
              <Text style={styles.usernameText}>{src.username}</Text>
              <Text style={styles.descText}>{src.description}</Text>
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
    height: windowHeight - 70,
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
    bottom: 235,
    right: 5,
  },
  shareText: {
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 215,
    right: 17,
    color: 'white',
  },
  playBut: {
    margin: 50,
    bottom: 250,
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
    bottom: 55,
    left: 5,
    color: 'white',
  },
  descText: {
    margin: 5,
    position: 'absolute',
    bottom: 15,
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
