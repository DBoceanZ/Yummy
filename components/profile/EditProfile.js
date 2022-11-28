import React from 'react';
import { View } from 'react-native';
import EditProfileHeader from './EditProfileHeader.js';
import { StatusBar } from 'expo-status-bar';

const EditProfile = () => {
  return (
    <View>
      <StatusBar barStyle="dark-content" translucent={false} />
      <EditProfileHeader />
    </View>
  );
};

export default EditProfile;
