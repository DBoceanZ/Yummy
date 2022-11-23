import React from 'react';
import { View } from 'react-native';
import ProfileHeader from './ProfileHeader.js';
import Thumbnails from './Thumbnails.js';

const Profile = ({ navigation }) => {
  const handleThumbnailTouch = () => {
    navigation.navigate("Home");
  };

  const videos = ['https://www.youtube.com/watch?v=LnBZs04XQOU', 'https://www.youtube.com/watch?v=FEGRLYSWJTk'];
  return (
    <View>
      <ProfileHeader />
      <Thumbnails 
        videos={videos} 
        handleTouch={handleThumbnailTouch}
      />
    </View>
  );
};

export default Profile;
