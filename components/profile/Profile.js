import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import ProfileHeader from './ProfileHeader.js';
import Thumbnails from './Thumbnails.js';
import { useGlobalContext } from '../../context/GlobalContext.js';
import { StatusBar } from 'expo-status-bar';

const Profile = ({ navigation }) => {
  const { userData } = useGlobalContext();
  const { UID } = userData;
  const [videos, setVideos] = useState([
    // {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669609054/dhx7xb8bszzxqgftlzab.mov', id: 1},
    // {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669610582/xy2fh6mvmsmrdrtkc5bm.mov', id: 2},
    // {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669610659/fa6cx9gyitugkioimheh.mov', id: 3},
    // {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669609054/dhx7xb8bszzxqgftlzab.mov', id: 4},
    // {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669610582/xy2fh6mvmsmrdrtkc5bm.mov', id: 5},
    // {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669610659/fa6cx9gyitugkioimheh.mov', id: 6},
    // {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669609054/dhx7xb8bszzxqgftlzab.mov', id: 7},
    // {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669610582/xy2fh6mvmsmrdrtkc5bm.mov', id: 8},
    // {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669610659/fa6cx9gyitugkioimheh.mov', id: 9}
  ]);

  // on touch navigation handlers
  const handleThumbnailTouch = () => {
    navigation.navigate('ProfileVideos');
  };

  const handleFollowersTouch = () => {
    navigation.navigate('Followers');
  };

  const handleFollowingTouch = () => {
    navigation.navigate('Following');
  };

  const handleEditProfileTouch = () => {
    navigation.navigate('Edit Profile');
  };

  // on page focus, fetch user videos from the database
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios
        .get(`http://18.212.89.94:3000/users/userData?user_id=${UID}`)
        .then((res) => {
          let videos = [];
          if (res.data.videos) {
            res.data.videos.forEach((video) => {
              videos.push(video);
            });
          }
          setVideos(videos);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" translucent={false} />
      <ProfileHeader
        handlers={{
          handleFollowersTouch,
          handleFollowingTouch,
          handleEditProfileTouch,
        }}
        navigation={navigation}
      />
      <Thumbnails handleTouch={handleThumbnailTouch} videos={videos} />
    </ScrollView>
  );
};

export default Profile;
