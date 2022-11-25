import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';
import styles from './styles';

const Thumbnails = ({ handleTouch }) => {
  const [videos, setVideos] = useState([
    'https://www.youtube.com/watch?v=LnBZs04XQOU', 
    'https://www.youtube.com/watch?v=FEGRLYSWJTk', 
    'https://www.youtube.com/shorts/h2VUi7iFlb8'
  ]); // TEMP
  const { userData } = useGlobalContext();
  const { selectedUserID } = userData;

  const getYouTubeID = (url) => {
    if (!url.includes('/shorts/')) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = url.match(regExp);
      return (match && match[7].length == 11) ? match[7] : false;
    }
    let urlArray = url.split('/');
    let videoId = '';
    urlArray.forEach((ele, index) => {
      if (urlArray[index - 1] === 'shorts') {
        videoId = ele;
      }
    });
    return videoId;
  };

  const thumbnailUrls = videos.map((video) => {
    let youTubeID = getYouTubeID(video);
    return `http://img.youtube.com/vi/${youTubeID}/maxresdefault.jpg`;
  });

  // on initial render, fetch user videos from database
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
    <View style={styles.thumbnailsContainer}>
      {thumbnailUrls.map((thumbnailUrl, index) => {
        return (
          <View style={styles.thumbnailContainer} key={`TN-container:${index}`}>
            <TouchableOpacity
              onPress={() => handleTouch()} key={`TN-touch:${index}`}>
              <Image
                style={styles.thumbnail}
                source={{uri: thumbnailUrl}}
                key={`TN:${index}`}>
              </Image>
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  );
};

export default Thumbnails;
