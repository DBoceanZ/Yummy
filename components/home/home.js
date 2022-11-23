import * as React from "react";
import axios from "axios";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Button,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import Comments from './Comments';
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
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [displayComments, setDisplayComments] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [comments, setComments] = React.useState([])
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

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

  return (
    <View style={styles.container}>
      <Comments displayComments={displayComments} setDisplayComments={setDisplayComments} />
      <ScrollView
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
            <TouchableOpacity
              onPress={() => {
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync();
              }}
            >
              <Video
                key={index}
                shouldPlay={focusedIndex === index}
                resizeMode="cover"
                ref={video}
                style={styles.video}
                source={src}
                useNativeControls={false}
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
              <AntDesign
                style={styles.heart}
                name="heart"
                size={38}
                color="white"
              />
              <Text style={styles.heartstatusText}>0</Text>
              <FontAwesome
                style={styles.comment}
                name="commenting-o"
                size={38}
                color="white"
                onPress={() => {
                  axios.get('http://10.0.0.221:4000/video/comments?video_id=1')
                    .then((response) => {console.log(response)})
                    .catch((err) => {console.log(err)})
                  setDisplayComments(true);
                }}
              />
              <Text style={styles.commentText}>0</Text>
              <FontAwesome
                style={styles.share}
                name="share"
                size={38}
                color="white"
              />
              <Text style={styles.shareText}>0</Text>
            </TouchableOpacity>
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
});
