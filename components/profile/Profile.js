import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View } from 'react-native';
import ProfileHeader from './ProfileHeader.js';
import Thumbnails from './Thumbnails.js';
import { useGlobalContext } from '../../context/GlobalContext.js';

const Profile = ({ navigation }) => {
  const { userData } = useGlobalContext();
  const { selectedUserID } = userData;
  const [videos, setVideos] = useState([
    'https://res.cloudinary.com/dzuekop5v/video/upload/v1669462538/aidb82iqwb1lmpw0vrbv.mov',
    'https://res.cloudinary.com/dzuekop5v/video/upload/v1669428168/jdsgsl5812uuoa5trbdz.mov',
    'https://res.cloudinary.com/dzuekop5v/video/upload/v1669427172/qfwfmc9owwf6ponyspvu.mov'
  ]);

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

  // on initial render, fetch user videos from the database
  useEffect(() => {
    axios.get(`http://18.212.89.94:3000/users/userData?user_id=${selectedUserID}`)
      .then((res) => {
        let videos = [];
        if (res.data.videos) {
          res.data.videos.forEach((video) => {
            videos.push(video.video_url);
          });
        }
        setVideos(videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View>
      <ProfileHeader 
        handlers={
          {handleFollowersTouch, handleFollowingTouch, handleEditProfileTouch}
        }
      />
      <Thumbnails handleTouch={handleThumbnailTouch} videos={videos}/>
    </View>
  );
};

export default Profile;
