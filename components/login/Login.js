import { View } from "react-native";
import {
  StyleSheet,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Stack, Text } from "@react-native-material/core";
import React, { useState, useEffect } from "react";
import { BasicInput } from "../lib/inputs/CustomInput.js";
import { LightButton } from "../lib/buttons/CustomButton.js";
import Logo from "../../assets/images/yummyLogo.png";
import { useAuth } from "../../context/authContext.js";

const Login = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState();
  const { login, currentUser, globalUsername, setGlobalUsername } = useAuth();

  useEffect(() => {
    if (currentUser.email && currentUser.firebaseId) {
      console.log("testing for user");
      getUserData();
    }
  }, [currentUser]);

  const clearData = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const getUserData = (user) => {
    console.log("get user data route");
    // grab globalUsername from DB pull
    navigation.navigate("Home");
  };

  const handleSubmit = () => {
    login(email, password);
  };

  return (
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
