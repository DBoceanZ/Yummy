import React from 'react';
import styles from './styles';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { LightButton } from '../lib/buttons/CustomButton';

const Profile = ({ user = 'ExampleUser'}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.imageTouchable}>
          <Image style={styles.image}></Image>
        </TouchableOpacity>
      </View>
      <Text style={styles.displayName}>{user}</Text>
      <View style={styles.countersContainer}>
        <View style={styles.counterItem}>
          <Text style={styles.counter}>0</Text>
          <Text style={styles.counterLabel}>Following</Text>
        </View>
        <View style={styles.counterItem}>
          <Text style={styles.counter}>0</Text>
          <Text style={styles.counterLabel}>Followers</Text>
        </View>
        <View style={styles.counterItem}>
          <Text style={styles.counter}>0</Text>
          <Text style={styles.counterLabel}>Likes</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <LightButton text='Follow' />
      </View>
    </View>
  )
};

export default Profile;