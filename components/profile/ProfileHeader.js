import React, { useState } from 'react';
import styles from './styles';
import { Text, View, Image } from 'react-native';
import { LightButton } from '../lib/buttons/CustomButton';

const Profile = ({ user = 'ExampleUser'}) => {
  const [image, setImage] = useState('http://tinyurl.com/68dvbhaw'); // TEMP

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: image}}></Image>
      </View>
      <Text style={styles.displayName}>{user}</Text>
      <View style={styles.countersContainer}>
        <View style={styles.counterItem}>
          <Text style={styles.counter}>0</Text>
          <Text style={styles.counterLabel}>Following</Text>
        </View>
        <Text style={styles.counterDivider}>|</Text>
        <View style={styles.counterItem}>
          <Text style={styles.counter}>0</Text>
          <Text style={styles.counterLabel}>Followers</Text>
        </View>
        <Text style={styles.counterDivider}>|</Text>
        <View style={styles.counterItem}>
          <Text style={styles.counter}>0</Text>
          <Text style={styles.counterLabel}>Likes</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <LightButton text='Follow'/>
      </View>
    </View>
  )
};

export default Profile;