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

const Register = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    navigation.navigate("Home");
    console.warn("Submit Pressed");
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
          value={password}
          setValue={setPassword}
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
