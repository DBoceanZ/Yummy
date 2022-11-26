import { View, Text, StyleSheet } from "react-native";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export function BasicInput({
  value,
  setValue,
  placeHolder,
  secureTextEntry,
  isPassword,
}) {
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={setValue}
        color="#222222"
        variant="outlined"
        label={placeHolder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {},
});
