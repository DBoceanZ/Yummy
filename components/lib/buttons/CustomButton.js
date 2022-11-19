import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

export function DarkButton({ text, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#134b5f" : "#1e232c",
        },
        styles.darkContainer,
      ]}
    >
      <Text style={styles.lightText}>{text}</Text>
    </Pressable>
  );
}

export function LightButton({ text, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#9FA8DA" : "#B4be00",
        },
        styles.lightContainer,
      ]}
    >
      <Text style={styles.darkText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  darkContainer: {
    width: "100%",
    padding: 20,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 6,
  },
  lightContainer: {
    width: "100%",
    padding: 20,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 6,
  },
  lightText: {
    fontWeight: "bold",
    color: "white",
  },
  darkText: {
    fontWeight: "bold",
    color: "#1e232c",
  },
});
