import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Box, Flex } from '@react-native-material/core';
import { Spacer } from 'react-native-flex-layout';
import { TextInput, Stack, IconButton, Button } from '@react-native-material/core';
import { Form, FormItem } from 'react-native-form-component';
import { SafeAreaView, Text, Image, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Logo from '../../assets/images/yummyLogo.png';
import { DarkButton, LightButton } from '../lib/buttons/CustomButton.js';
import { CommonActions } from '@react-navigation/native';
//

export default function Login({ navigation }) {
  const { height } = useWindowDimensions();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };
  const handleRegistration = () => {
    navigation.navigate('Register');
  };
  const handleGuestLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'BottomNav' }],
      })
    );
  };
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent={true} />
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      ></Image>
      <Stack spacing={2}>
        <DarkButton text="login" onPress={handleLoginPress} />
        <LightButton text="Register" onPress={handleRegistration} />
      </Stack>
      <Flex>
        <Box style={styles.spaceHolder}></Box>
        <Text Pressable onPress={handleGuestLogin} style={styles.text}>
          Continue as a Guest
        </Text>
      </Flex>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#111111',
    flexDirection: 'column',
    padding: 20,
  },
  bottomAlign: {},
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    color: '#ffffff',
  },
  text: {
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: '70%',
    maxWidth: 500,
    maxHeight: 300,
  },
  spaceHolder: {
    height: '60%',
  },
});
