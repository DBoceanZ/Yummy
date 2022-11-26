import { StatusBar } from "expo-status-bar";
import "expo-dev-client";
import { AuthProvider } from "./context/authContext.js";
import { Context } from "./context/GlobalContext";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "./components/login/Welcome.js";
import Login from "./components/login/Login.js";
import EditProfile from "./components/profile/EditProfile.js";
import Profile from "./components/profile/Profile.js";
import Register from "./components/login/Register.js";
import TestNav from "./components/login/testNav.js";
import Home from "./components/home/home.js";
import FollowerList from "./components/follows/FollowerList.js";
import FollowingList from "./components/follows/FollowingList.js";
import { Entypo, AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import addVideo from "./components/home/addVideo.js";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
]);

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return focused ? (
              <Ionicons name="home" size={24} color="white" />
            ) : (
              <Ionicons name="home-outline" size={24} color="white" />
            );
          }
          if (route.name === "Profile") {
            return focused ? (
              <Ionicons name="person" size={24} color="white" />
            ) : (
              <Ionicons name="person-outline" size={24} color="white" />
            );
          }
          if (route.name === "Friends") {
            return focused ? (
              <Ionicons
                name="people-sharp"
                size={24}
                color="white"
                style={{ transform: [{ rotateY: "180deg" }] }}
              />
            ) : (
              <Ionicons
                name="people-outline"
                size={24}
                color="white"
                style={{ transform: [{ rotateY: "180deg" }] }}
              />
            );
          }
          if (route.name === "Inbox") {
            return focused ? (
              <MaterialCommunityIcons name="message" size={24} color="white" />
            ) : (
              <Feather name="message-square" size={24} color="white" />
            );
          }
          if (route.name === "Add") {
            return (
              <>
                <View
                  style={styles.square}
                  backgroundColor="#fd004d"
                  left={46}
                />
                <View
                  style={styles.square}
                  backgroundColor="#00ffeb"
                  right={46}
                />
                <View
                  style={styles.square}
                  backgroundColor="white"
                  width={36}
                />
                <Entypo name="plus" size={24} color="black" />
              </>
            );
          }
        },
        tabBarStyle: { backgroundColor: "black", height: 80 },
        headerShown: false,
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "tomato",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Friends" component={Home} />
      <Tab.Screen
        name="Add"
        component={addVideo}
        options={{ tabBarLabel: () => null }}
      />
      <Tab.Screen name="Inbox" component={Home} />
      <Tab.Screen name="Profile" component={Home} />
    </Tab.Navigator>
  );
}

const NavigationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#f2f2f2",
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
        name="BottomNav"
        component={BottomNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      ></Stack.Screen>
      <Stack.Screen name="Following" component={FollowingList}></Stack.Screen>
      <Stack.Screen name="Followers" component={FollowerList}></Stack.Screen>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      <Stack.Screen name="Edit Profile" component={EditProfile}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      {/* <SafeAreaView style={styles.container}> */}
      <Context>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </Context>
      {/* </SafeAreaView> */}
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffae1f",
  },
  screenHeader: {},
  square: {
    borderRadius: 3,
    width: 12,
    height: 26,
    position: "absolute",
  },
});
