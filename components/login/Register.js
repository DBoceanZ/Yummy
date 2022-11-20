import { View } from "react-native";
import {
  StyleSheet,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Stack, Text } from "@react-native-material/core";
import React, { useState } from "react";
import { BasicInput } from "../lib/inputs/CustomInput.js";
import { LightButton } from "../lib/buttons/CustomButton.js";
import Logo from "../../assets/images/yummyLogo.png";
import { auth } from "../../config/firebase.js";

const handleSubmit = () => {
  console.warn("Submit Pressed");
};

const Register = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        alert("Registered! Welcome!");
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(err.message);
        alert("Error! Please Try Again");
      });
  };
  const passwordRedirect = () => {
    alert("Passwords don't match");
    navigation.navigate("Register");
  };
  const redirectToLogin = () => {
    alert("Registered! Please log in!");
    navigation.navigate("Login");
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
        Register
      </Text>
      <Stack m={4} spacing={4}>
        <BasicInput
          placeHolder="Username"
          value={username}
          setValue={setUsername}
        />
        <BasicInput
          placeHolder="email"
          value={email}
          setValue={setEmail}
          onChangetext={(text) => setEmail(text)}
        />
        <BasicInput
          placeHolder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <BasicInput
          placeHolder="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          secureTextEntry={true}
          onChangeText={(text) =>
            text === password ? redirectToLogin() : passwordRedirect()
          }
        />
        <LightButton text="submit" onPress={handleSubmit} />
      </Stack>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    padding: 15,
  },
  text: {
    alignSelf: "center",
  },
  logo: {
    alignSelf: "center",
    width: "70%",
    maxWidth: 500,
    maxHeight: 100,
  },
});
export default Register;
