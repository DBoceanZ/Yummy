import * as React from "react";
import axios from "axios";
import { AntDesign, FontAwesome, Foundation } from "@expo/vector-icons";
import { useState } from "react";

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
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { LightButton } from "../lib/buttons/CustomButton.js";
import testfile from "./testmedia/testvideo.mp4";
import testfile1 from "./testmedia/testvideo1.mp4";
import testfile2 from "./testmedia/testvideo2.mp4";
import testfile3 from "./testmedia/testvideo.mp4";
import testfile4 from "./testmedia/testvideo1.mp4";
import testfile5 from "./testmedia/testvideo2.mp4";
import { Stack, IconButton } from "@react-native-material/core";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const files = [testfile, testfile1, testfile2, testfile3, testfile4, testfile5];

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home() {
  const videoref = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const opacity = useState(new Animated.Value(0))[0];

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

  const handleScroll = React.useCallback(
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

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    axios
      .get(
        "http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json"
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    setRefreshing(false);
  }, []);

  console.log(status.isPlaying === false);
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        disableIntervalMomentum={false}
        onScroll={handleScroll}
        snapToInterval={windowHeight}
        decelerationRate="fast"
        vertical
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {files.map((src, index) => (
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
                source={src}
                useNativeControls={false}
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
              <Animated.View
                style={[
                  {
                    opacity,
                  },
                ]}
              >
                <Foundation
                  style={styles.playBut}
                  name="play"
                  size={88}
                  color="white"
                />
              </Animated.View>
              <AntDesign
                style={styles.heart}
                name="heart"
                size={38}
                color="white"
              />
              <Text style={styles.heartText}>0</Text>
              <FontAwesome
                style={styles.comment}
                name="commenting-o"
                size={38}
                color="white"
              />
              <Text style={styles.commentText}>0</Text>
              <FontAwesome
                style={styles.share}
                name="share"
                size={38}
                color="white"
              />
              <Text style={styles.shareText}>0</Text>
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
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heart: {
    margin: 5,
    position: "absolute",
    bottom: 330,
    right: 5,
  },
  heartText: {
    margin: 5,
    fontWeight: "bold",
    position: "absolute",
    bottom: 310,
    right: 20,
    color: "white",
  },
  comment: {
    margin: 5,
    position: "absolute",
    bottom: 260,
    right: 5,
  },
  commentText: {
    margin: 5,
    fontWeight: "bold",
    position: "absolute",
    bottom: 240,
    right: 20,
    color: "white",
  },
  share: {
    margin: 5,
    position: "absolute",
    bottom: 190,
    right: 5,
  },
  shareText: {
    margin: 5,
    fontWeight: "bold",
    position: "absolute",
    bottom: 170,
    right: 20,
    color: "white",
  },
  playBut: {
    margin: 50,
    bottom: 350,
    right: 110,
    position: "absolute",
    opacity: 0.4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  playButContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
