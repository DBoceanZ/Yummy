import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";

export default function addVideo() {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");

  return (
    <SafeAreaView>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
        ></TextInput>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
