import React from 'react';
import { View } from 'react-native';
import ProfileHeader from './ProfileHeader.js';
import Thumbnails from './Thumbnails.js';

const Profile = ({ navigation }) => {
  // on touch navigation handlers
  const handleThumbnailTouch = () => {
    navigation.navigate("Home");
  };

  const handleFollowersTouch = () => {
    navigation.navigate("Followers");
  };

  const handleFollowingTouch = () => {
    navigation.navigate("Following");
  };

  const handleEditProfileTouch = () => {
    navigation.navigate("Edit Profile");
  };

  return (
    <View>
      <ProfileHeader 
        handlers={
          {handleFollowersTouch, handleFollowingTouch, handleEditProfileTouch}
        }
      />
      <Thumbnails handleTouch={handleThumbnailTouch} />
    </View>
  );
};

export default Profile;
