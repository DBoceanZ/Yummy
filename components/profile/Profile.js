import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import ProfileHeader from './ProfileHeader.js';
import Thumbnails from './Thumbnails.js';
import { useGlobalContext } from '../../context/GlobalContext.js';

const Profile = ({ navigation }) => {
  const { userData } = useGlobalContext();
  const { selectedUserID } = userData;
  const [videos, setVideos] = useState([
    {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669462538/aidb82iqwb1lmpw0vrbv.mov', id: 1},
    {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669427172/qfwfmc9owwf6ponyspvu.mov', id: 2},
    {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669428168/jdsgsl5812uuoa5trbdz.mov', id: 3},
    {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669462538/aidb82iqwb1lmpw0vrbv.mov', id: 4},
    {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669427172/qfwfmc9owwf6ponyspvu.mov', id: 5},
    {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669428168/jdsgsl5812uuoa5trbdz.mov', id: 6},
    {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669462538/aidb82iqwb1lmpw0vrbv.mov', id: 7},
    {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669427172/qfwfmc9owwf6ponyspvu.mov', id: 8},
    {video_url: 'https://res.cloudinary.com/dzuekop5v/video/upload/v1669428168/jdsgsl5812uuoa5trbdz.mov', id: 9}
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
      .get(`http://18.212.89.94:3000/users/userData?user_id=${selectedUserID}`)
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
      <ProfileHeader 
        handlers={{
          handleFollowersTouch, 
          handleFollowingTouch, 
          handleEditProfileTouch
        }}
        navigation={navigation}
      />
      <Thumbnails handleTouch={handleThumbnailTouch} videos={videos} />
    </ScrollView>
  );
};

export default Profile;
