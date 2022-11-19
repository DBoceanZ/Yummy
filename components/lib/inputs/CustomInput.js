import { View, Text, StyleSheet } from "react-native";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import React from "react";

export function BasicInput({ value, setValue, placeHolder, secureTextEntry }) {
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
