import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const Thumbnails = ({ handleTouch, videos }) => {

  const getYouTubeID = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  };

  const thumbnailUrls = videos.map((video) => {
    let youTubeID = getYouTubeID(video);
    return `http://img.youtube.com/vi/${youTubeID}/hqdefault.jpg`;
  });

  return (
    <View style={styles.container}>
      {thumbnailUrls.map((thumbnailUrl, index) => {
        return (
          <TouchableOpacity 
            onPress={() => handleTouch()} key={`TN-touch:${index}`}>
            <Image style={{width: 150, height: 100}} source={{uri: thumbnailUrl}} key={`TN:${index}`}></Image>
          </TouchableOpacity>
        )
      })}
    </View>
  );

};

export default Thumbnails;
