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
import { useAuth } from "../../context/authContext.js";
import { useGlobalContext } from "../../context/GlobalContext";
import Spinner from "react-native-loading-spinner-overlay";

const handleSubmit = () => {
  console.warn("Submit Pressed");
};

const Register = ({ navigation }) => {
  const { loading, setLoading, userData, setUserData } = useGlobalContext();
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, currentUser, setGlobalUsername, globalUserName } = useAuth();
  const [user, setUser] = useState({});

  const clearData = () => {
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setUsername("");
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  useEffect(() => {
    if (currentUser.email && currentUser.firebaseId) {
      createNewUser(user);
      clearData();
      // navigation.navigate("BottomNav");
    }
  }, [currentUser]);

  const createNewUser = async (user) => {
    console.log("create new user route");
    console.log("user", currentUser);
    setUserData({
      ...userData,
      userName: username,
      UID: currentUser.firebaseId,
    });
    setLoading(false);
    clearData();
    alert(`Welcome ${username}!`);
    navigation.navigate("BottomNav");
    //will set globalUsername on DB pull
    // await axios.post("/user", user);
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const user = await signup(email, password);
    } catch (err) {
      console.log(err);
    }
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
      <View>
        {loading ? (
          <Spinner visible={loading} textContent={"Loading..."} />
        ) : (
          <>
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
                onChangetext={(text) => {
                  setLoading(true);
                  setEmail(text);
                }}
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
          </>
        )}
      </View>
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
