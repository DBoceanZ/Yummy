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
import { auth } from "../../config/firebase.js";

const Login = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);
  const handleSubmit = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("logged in with:", user.email);
      })
      .catch((err) => {
        alert("Error! Redirecting to Registration");
        navigation.navigate("Register");
      });
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
