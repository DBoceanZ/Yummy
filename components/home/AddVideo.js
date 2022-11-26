import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from "./cloudinaryConfig";
import axios from "axios";
import { Notifier, Easing } from "react-native-notifier";

export default function AddVideo({ navigation }) {
  const [video, setVideo] = useState(null);
  const [currentUpload, setCurrentUpload] = useState(null);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Videos",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 60,
    });
    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      let newFile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`,
      };
      setCurrentUpload(newFile);
    } else {
      navigation.goBack();
    }
  };
  const handleUpload = async (video) => {
    const data = new FormData();
    data.append("file", video);
    data.append("upload_preset", "yummy_upload");
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`,
        data
      )
      .then((res) => {
        console.log("data: ", res.data.secure_url);
        Notifier.showNotification({
          title: "Video Uploaded! 🎉",
          duration: 3000,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          hideOnPress: true,
          swipeEnabled: true,
          alertType: "success",
        });
        setCurrentUpload(null);
      })
      .catch((err) => {
        console.log(err);
        Notifier.showNotification({
          title: "Upload Failed 🙁 Try Again ",
          duration: 3000,
          showAnimationDuration: 800,
          hideOnPress: true,
          swipeEnabled: true,
          alertType: "error",
        });
        setCurrentUpload(null);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //Every time the screen is focused the Video starts playing
      pickVideo();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {currentUpload ? (
          <Button
            title="upload"
            onPress={() => {
              handleUpload(currentUpload);
            }}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
});
