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
import { formData } from "./formData.js";
import FormField from "./FormField";
import { useGlobalContext } from "../../context/GlobalContext";

export default function AddVideo({ navigation }) {
  const [video, setVideo] = useState(null);
  const [currentUpload, setCurrentUpload] = useState(null);
  const { userData, setUserData } = useGlobalContext();

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
    }
  };
  const handleUpload = async () => {
    if (userData.UID === "") {
      Notifier.showNotification({
        title: "Must have account to upload",
        duration: 3000,
        showAnimationDuration: 800,
        hideOnPress: true,
        swipeEnabled: true,
        alertType: "warn",
      });
      return;
    }
    const data = new FormData();
    data.append("file", currentUpload);
    data.append("upload_preset", "yummy_upload");
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`,
        data
      )
      .then((res) => {
        console.log(userData);
        axios
          .post("/videos/postvideo", {
            summary: formValues.description,
            user_id: userData.UID,
            video_url: res.data.secure_url,
          })
          .catch((err) => {
            console.log(err);
            Notifier.showNotification({
              title: "Upload Failed 🙁 Try Again ",
              duration: 4000,
              showAnimationDuration: 800,
              hideOnPress: true,
              swipeEnabled: true,
              alertType: "error",
            });
            setCurrentUpload(null);
          });
        Notifier.showNotification({
          title: "Video Uploaded! 🎉",
          duration: 4000,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          hideOnPress: true,
          swipeEnabled: true,
          alertType: "success",
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

  const [formValues, handleFormValueChange, setFormValues] = formData({
    description: "",
    tags: "",
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            fontWeight: "300",
            paddingBottom: 30,
            color: "white",
          }}
        >
          Upload Video
        </Text>
        <FormField
          formKey="description"
          placeholder="a description of your video"
          handleFormValueChange={handleFormValueChange}
        />
        <FormField
          formKey="tags"
          placeholder="at least 3 tags (comma seperated)"
          textInputProps={{
            autoCapitalize: "none",
          }}
          handleFormValueChange={handleFormValueChange}
        />
        {video !== null ? (
          <Button title="choose video" onPress={pickVideo} />
        ) : (
          <Button title="choose new video" onPress={pickVideo} />
        )}
        {currentUpload ? (
          <Button
            title="Upload"
            onPress={() => {
              console.log(formValues.tags.split(","));
              if (formValues.tags.split(",").length >= 3) {
                handleUpload();
              }
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
    backgroundColor: "#192734",
  },
  header: {
    color: "white",
  },
});
