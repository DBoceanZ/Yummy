import { StatusBar } from "expo-status-bar";
import "expo-dev-client";

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./components/login/Welcome.js";
import Login from "./components/login/Login.js";
import Register from "./components/login/Register.js";
import TestNav from "./components/login/testNav.js";

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
        headerTintColor: "#B4be00",
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
      {/* <Stack.Screen name="TestNav" component={TestNav}></Stack.Screen> */}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B4be00",
  },
  screenHeader: {},
});
