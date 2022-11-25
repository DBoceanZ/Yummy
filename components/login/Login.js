import { View } from "react-native";
import {
  StyleSheet,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Stack, Text } from "@react-native-material/core";
import React, { useState, useEffect } from "react";
import { BasicInput } from "../lib/inputs/CustomInput.js";
import { LightButton } from "../lib/buttons/CustomButton.js";
import Logo from "../../assets/images/yummyLogo.png";
import { useAuth } from "../../context/authContext.js";
import { useGlobalContext } from "../../context/GlobalContext";
import axios from "axios";

const Login = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
      navigation.navigate("BottomNav");
    }
  }, [userData]);

  const clearData = () => {
    setUsername("");
    setEmail("");
    setPassword("");
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
      });
    } catch (err) {
      console.log(err);
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
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          ></Image>

          <Text style={styles.text} variant="h4">
            Login
          </Text>
          <Stack m={4} spacing={4}>
            <BasicInput
              placeHolder="email"
              value={email}
              setValue={setEmail}
              onChangeText={(text) => setEmail(text)}
            />
            <BasicInput
              placeHolder="password"
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <LightButton text="submit" onPress={handleSubmit} />
          </Stack>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    alignSelf: "center",
  },
  logo: {
    alignSelf: "center",
    width: "70%",
    maxWidth: 500,
    maxHeight: 150,
  },
});
export default Login;
