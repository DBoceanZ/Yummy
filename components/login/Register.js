import { View } from "react-native";
import {
  StyleSheet,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import {
  Stack,
  Text,
  TextInput,
  Surface,
  IconButton,
} from "@react-native-material/core";
import React, { useState, useEffect } from "react";
import { BasicInput } from "../lib/inputs/CustomInput.js";
import { LightButton } from "../lib/buttons/CustomButton.js";
import Logo from "../../assets/images/yummyLogo.png";
import { auth } from "../../config/firebase.js";
import { useAuth } from "../../context/authContext.js";
import { useGlobalContext } from "../../context/GlobalContext";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";

const handleSubmit = () => {
  console.warn("Submit Pressed");
};

const Register = ({ navigation }) => {
  const { loading, setLoading, userData, setUserData } = useGlobalContext();
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(true);
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

  const createNewUser = async (newUser) => {
    const postData = {
      auth_key: newUser.firebaseId,
      username: username,
      email: newUser.email,
    };
    try {
      await axios.post("http://18.212.89.94:3000/login/user", postData);
      getLoggedInUser(postData.auth_key);
    } catch (err) {
      console.log(err);
    }
  };
  const getLoggedInUser = async (auth_key) => {
    try {
      const { data: userFetch } = await axios.get(
        `http://18.212.89.94:3000/login/user/${auth_key}`
      );
      console.log("userFetch", userFetch[0]);
      setUserData({
        ...userData,
        username: userFetch[0].username,
        UID: userFetch[0].id,
        userEmail: userFetch[0].email,
        profile_photo: userFetch[0].profile_photo_url,
      });
      alert(`Welcome ${username}!`);
      navigation.navigate("BottomNav");
      clearData();
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert(`Uh-oh! There is an error loging you in. Please try again...`);
      navigation.navigate("Welcome");
    }
  };
  const handlePasswordMismatch = () => {
    alert("Passwords Don't Match! Please retry...");
    setPassword("");
    setConfirmPassword("");
  };
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      handlePasswordMismatch();
    } else {
      try {
        setLoading(true);
        const newUser = await signup(email, password);
        createNewUser(newUser);
      } catch (err) {
        console.log(err);
      }
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
            <Surface
              elevation={2}
              category="medium"
              style={styles.surfaceStyle}
            >
              {/* <Text style={[styles.text, styles.shadowProp]} variant="h4">
                Register
              </Text> */}
              <Stack m={16} spacing={4} style={styles.shadowProp}>
                <BasicInput
                  placeHolder="Username"
                  value={username}
                  setValue={setUsername}
                />
                <View />
                <BasicInput
                  placeHolder="email"
                  value={email}
                  setValue={setEmail}
                  onChangetext={(text) => {
                    setLoading(true);
                    setEmail(text);
                  }}
                />
                <View />
                <TextInput
                  label="password"
                  value={password}
                  color="#222222"
                  setValue={setPassword}
                  onChangeText={(text) => setPassword(text)}
                  variant="outlined"
                  secureTextEntry={showPassword}
                  style={styles.inputStyle}
                  trailing={(props) => (
                    <IconButton
                      onPress={() => {
                        showPassword
                          ? setShowPassword(false)
                          : setShowPassword(true);
                      }}
                      icon={(props) => <Icon name="eye" />}
                    />
                  )}
                />
                <View />
                <TextInput
                  label="password"
                  value={confirmPassword}
                  color="#222222"
                  setValue={setPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  variant="outlined"
                  secureTextEntry={showPassword}
                  style={styles.inputStyle}
                  trailing={(props) => (
                    <IconButton
                      onPress={() => {
                        showPassword
                          ? setShowPassword(false)
                          : setShowPassword(true);
                      }}
                      icon={(props) => <Icon name="eye" />}
                    />
                  )}
                />

                <LightButton text="submit" onPress={handleSubmit} />
              </Stack>
            </Surface>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    padding: 22,
    paddingTop: 16,
  },
  text: {
    alignSelf: "center",
  },
  logo: {
    alignSelf: "center",
    width: "70%",
    maxWidth: 500,
    maxHeight: 80,
  },
  surfaceStyle: {
    backgroundColor: "#f2f2f2",
    padding: 11,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default Register;
