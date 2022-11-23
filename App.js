import { StatusBar } from "expo-status-bar";
import "expo-dev-client";
import { AuthProvider } from "./context/authContext.js";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./components/login/Welcome.js";
import Login from "./components/login/login.js";
import Profile from "./components/profile/Profile.js";
import Register from "./components/login/Register.js";
import TestNav from "./components/login/testNav.js";
import Home from "./components/home/home.js";
import FollowerList from "./components/follows/FollowerList.js";
import FollowingList from "./components/follows/FollowingList.js";

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#1e232c",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#B4be00",
        },
        headerTintColor: "#ffae1f",
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      ></Stack.Screen>
      <Stack.Screen name="Following" component={FollowingList}></Stack.Screen>
      <Stack.Screen name="Followers" component={FollowerList}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffae1f",
  },
  screenHeader: {},
});
