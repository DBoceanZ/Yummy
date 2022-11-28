import React from 'react';
import { View } from 'react-native';
import EditProfileHeader from './EditProfileHeader.js';
import { StatusBar } from 'expo-status-bar';

const EditProfile = ({ navigation }) => {
  const handleFollowersTouch = () => {
    navigation.navigate('Followers');
  };

  const handleFollowingTouch = () => {
    navigation.navigate('Following');
  };

  let handlers = { handleFollowersTouch, handleFollowingTouch }
  return (
    <View>
      <StatusBar barStyle="dark-content" translucent={false} />
      <EditProfileHeader handlers={handlers} />
    </View>
  );
};

export default EditProfile;
