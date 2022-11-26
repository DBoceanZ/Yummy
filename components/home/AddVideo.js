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
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from "./cloudinaryConfig";
import axios from "axios";

export default function AddVideo() {
  const [video, setVideo] = useState(null);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Videos",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      let newFile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`,
      };
      handleUpload(newFile);
    }
  };
  const handleUpload = (video) => {
    const data = new FormData();
    data.append("file", video);
    data.append("upload_preset", "yummy_upload");
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`,
        data
      )
      .then((res) => res.json())
      .then((data) => console.log("data: ", data.secure_url))
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView>
      <View>
        <Button onPress={pickVideo} title="hiiiiiiiiiii" />
      </View>
    </SafeAreaView>
  );
}
