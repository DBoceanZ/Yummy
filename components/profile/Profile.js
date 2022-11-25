import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import ProfileHeader from './ProfileHeader.js';
import Thumbnails from './Thumbnails.js';
import { useGlobalContext } from '../../context/GlobalContext.js';
import axios from 'axios';

const Profile = ({ navigation }) => {
  const { userData } = useGlobalContext();
  const { selectedUserID } = userData;
  const [videos, setVideos] = useState(['https://www.youtube.com/watch?v=LnBZs04XQOU', 'https://www.youtube.com/watch?v=FEGRLYSWJTk']);

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

  // on initial render, fetch user profile data from database

  return (
    <View>
      <ProfileHeader 
        handlers={
          {handleFollowersTouch, handleFollowingTouch, handleEditProfileTouch}
        }
      />
      <Thumbnails 
        videos={videos} 
        handleTouch={handleThumbnailTouch}
      />
    </View>
  );
};

export default Profile;
