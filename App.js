import { StatusBar } from "expo-status-bar";
import "expo-dev-client";

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "./components/login/Welcome.js";
import Login from "./components/login/Login.js";
import Profile from "./components/profile/Profile.js";
import Register from "./components/login/Register.js";
import TestNav from "./components/login/testNav.js";
import Home from "./components/home/home.js";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function bottomNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "black", height: 80 },
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
}

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
        headerTintColor: "#B4be00",
      }}
    >
      <Stack.Screen
        name="bottomNav"
        component={bottomNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      ></Stack.Screen>
      {/* <Stack.Screen name="TestNav" component={TestNav}></Stack.Screen> */}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    // <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B4be00",
  },
  screenHeader: {},
});
