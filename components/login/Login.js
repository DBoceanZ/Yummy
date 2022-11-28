import { View } from 'react-native';
import { StyleSheet, Image, useWindowDimensions, KeyboardAvoidingView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Surface,
  HStack,
  VStack,
  Text,
  Divider,
  TextInput,
  IconButton,
} from '@react-native-material/core';
import React, { useState, useEffect } from 'react';
import { BasicInput, PasswordInput } from '../lib/inputs/CustomInput.js';
import { LightButton } from '../lib/buttons/CustomButton.js';
import Logo from '../../assets/images/yummyLogo.png';
import { useAuth } from '../../context/authContext.js';
import { useGlobalContext } from '../../context/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';

const Login = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const { login, currentUser, globalUsername, setGlobalUsername } = useAuth();
  const { loading, setLoading, userData, setUserData } = useGlobalContext();

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  // useEffect(() => {
  //   if (currentUser) {
  //     getUserData(currentUser);
  //   }
  // }, [currentUser]);

  useEffect(() => {
    if (userData.UID) {
      alert(`Nice to see you again, ${userData.username}`);
      clearData();
      setLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'BottomNav' }],
        })
      );
    }
  }, [userData]);

  const clearData = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const getUserData = async (loggedInUser) => {
    try {
      const { data: user } = await axios.get(
        `http://18.212.89.94:3000/login/user/${loggedInUser.firebaseId}`
      );
      setUserData({
        ...userData,
        username: user[0].username,
        userEmail: user[0].email,
        profile_photo: user[0].profile_photo_url,
        UID: user[0].id,
        selectedUserID: user[0].id
      });
    } catch (err) {
      console.log(err);
      alert(`Uh-oh! There is an error loging you in. Please try again...`);
      navigation.navigate('Welcome');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const loggedInUser = await login(email, password);
      getUserData(loggedInUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      {loading ? (
        <Spinner visible={loading} textContent={`Welcome Back!`} />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          enabled="true"
        >
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          ></Image>
          <Surface elevation={2} category="medium" style={styles.surfaceStyle}>
            {/* <Text
              color="#225e6c"
              style={[styles.text, styles.shadowProp]}
              variant="h4"
            >
              Login
            </Text> */}

            <VStack m={20} spacing={8} style={styles.shadowProp}>
              <BasicInput
                placeHolder="email"
                value={email}
                setValue={setEmail}
                onChangeText={(text) => setEmail(text)}
              />
              {/* <TextInput
                label="password"
                variant="outlined"

                trailing={(props) => (
                  <IconButton icon={(props) => <Icon name="eye" />} />
                )}
              /> */}
              <View />
              <TextInput
                label="password"
                value={password}
                color="#222222"
                setValue={setPassword}
                variant="outlined"
                secureTextEntry={showPassword}
                onChangeText={(text) => setPassword(text)}
                style={styles.inputStyle}
                trailing={(props) => (
                  <IconButton
                    onPress={() => {
                      showPassword ? setShowPassword(false) : setShowPassword(true);
                    }}
                    icon={(props) => <Icon name="eye" />}
                  />
                )}
              />

              <LightButton text="submit" onPress={handleSubmit} />
            </VStack>
          </Surface>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 22,
  },
  passwordContainer: {},
  inputStyle: {},
  text: {
    alignSelf: 'center',
    padding: 10,
  },
  logo: {
    alignSelf: 'center',
    width: '70%',
    maxWidth: 500,
    maxHeight: 150,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  surfaceStyle: {
    backgroundColor: '#f2f2f2',
    padding: 11,
  },
});
export default Login;
