import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from '@env';
import axios from 'axios';
import { Notifier, Easing } from 'react-native-notifier';
import { useGlobalContext } from '../../context/GlobalContext';
import { Surface, VStack, Text, Divider, TextInput, IconButton } from '@react-native-material/core';
import { LightButton } from '../lib/buttons/CustomButton.js';
import { StatusBar } from 'expo-status-bar';

export default function AddVideo({ navigation }) {
  const [video, setVideo] = useState(null);
  const [currentUpload, setCurrentUpload] = useState(null);
  const { userData, setUserData } = useGlobalContext();
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Videos',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 60,
    });
    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      let newFile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split('.')[1]}`,
        name: `test.${result.assets[0].uri.split('.')[1]}`,
      };
      setCurrentUpload(newFile);
    }
  };
  const handleUpload = async () => {
    if (userData.UID === '') {
      Notifier.showNotification({
        title: 'Must have account to upload',
        duration: 3000,
        showAnimationDuration: 800,
        hideOnPress: true,
        swipeEnabled: true,
        alertType: 'warn',
      });
      return;
    }
    const data = new FormData();
    data.append('file', currentUpload);
    data.append('upload_preset', 'yummy_upload');
    data.append('cloud_name', CLOUDINARY_CLOUD_NAME);
    axios
      .post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`, data)
      .then((res) => {
        axios
          .post('http://18.212.89.94:3000/videos/postvideo', {
            summary: formValues.description,
            user_id: userData.UID,
            video_url: res.data.secure_url,
          })
          .catch((err) => {
            console.log(err);
            Notifier.showNotification({
              title: 'Upload Failed 🙁 Try Again ',
              duration: 4000,
              showAnimationDuration: 800,
              hideOnPress: true,
              swipeEnabled: true,
              alertType: 'error',
            });
            setCurrentUpload(null);
          });
        Notifier.showNotification({
          title: 'Video Uploaded! 🎉',
          duration: 4000,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          hideOnPress: true,
          swipeEnabled: true,
          alertType: 'success',
        });
        setCurrentUpload(null);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //Every time the screen is focused the Video starts playing
      pickVideo();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={{ textAlign: 'center' }} variant="h5">
        Upload Video
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
        enabled="true"
      >
        <Surface elevation={2} category="medium" style={styles.surfaceStyle}>
          <VStack m={20} spacing={8} style={styles.shadowProp}>
            <TextInput
              label="description"
              value={description}
              color="#222222"
              variant="outlined"
              onChangeText={(text) => setDescription(text)}
              style={styles.textInput}
            />
            <View />
            <TextInput
              label="tags"
              helperText="at least 3 comma seperated tags"
              value={tags}
              color="#222222"
              variant="outlined"
              onChangeText={(text) => setTags(text)}
              style={styles.textInput}
            />
            {video !== null ? (
              <Button title="change video" onPress={pickVideo} />
            ) : (
              <Button title="choose video" onPress={pickVideo} />
            )}
            <LightButton text="submit" onPress={handleUpload} />
          </VStack>
        </Surface>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 22,
  },
  text: {
    alignSelf: 'center',
    padding: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  surfaceStyle: {
    backgroundColor: '#f2f2f2',
    padding: 11,
  },
  textInput: {},
});
