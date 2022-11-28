import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';
import styles from './styles';

const Thumbnails = ({ handleTouch, videos }) => {
  const { setHomeVideos } = useGlobalContext();

  // if we choose to support youtube videos in the future
  // const getYouTubeID = (url) => {
  //   if (!url.includes('/shorts/')) {
  //     var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  //     var match = url.match(regExp);
  //     return (match && match[7].length == 11) ? match[7] : false;
  //   }
  //   let urlArray = url.split('/');
  //   let videoId = '';
  //   urlArray.forEach((ele, index) => {
  //     if (urlArray[index - 1] === 'shorts') {
  //       videoId = ele;
  //     }
  //   });
  //   return videoId;
  // };

  const getThumbnailUrl = (video) => {
    let extensionlessVid = video.substring(0, video.length - 4);
    return extensionlessVid + '.jpg';
  };

  const thumbnailUrls = videos.map((video) => {
    return getThumbnailUrl(video.video_url);
  });

  return (
    <View style={styles.thumbnailsContainer}>
      {thumbnailUrls.map((thumbnailUrl, index) => {
        return (
          <View style={styles.thumbnailContainer} key={`TN-container:${index}`}>
            <TouchableOpacity
              onPress={
                () => {
                  setHomeVideos({
                    videos: videos,
                    index: index
                  });
                  handleTouch();
                }
              }
              key={`TN-touch:${index}`}
              value={index}
            >
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
