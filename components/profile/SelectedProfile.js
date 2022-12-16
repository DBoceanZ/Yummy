import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import SelectedProfileHeader from './SelectedProfileHeader.js';
import Thumbnails from './Thumbnails.js';
import { useGlobalContext } from '../../context/GlobalContext.js';

const SelectedProfile = ({ navigation, route }) => {
  const { selected_userid } = route.params;
  const [videos, setVideos] = useState([]);

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

  // on page focus, fetch user videos from the database
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios
        .get(`https://yummy-production.up.railway.app/users/userData?user_id=${selected_userid}`)
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
      <SelectedProfileHeader
        handlers={{
          handleFollowersTouch,
          handleFollowingTouch,
        }}
        navigation={navigation}
        selected_userid={selected_userid}
      />
      <Thumbnails handleTouch={handleThumbnailTouch} videos={videos} />
    </ScrollView>
  );
};

export default SelectedProfile;
