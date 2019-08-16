import React from "react";
import {
  KeyboardAvoidingView, // to the keyboard do not cover the content (only IOS)
  Platform, // to identify our current platform (ios or android)
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";

import logo from "../assets/logo.png";

export default function Login() {
  return (
    <KeyboardAvoidingView 
      behavior="padding" // creates a padding with the same size of keyboard, pushing all content up
      enabled={Platform.OS == 'ios'}
      style={styles.container}
    >
      <Image source={logo} />
      <TextInput
        autoCapitalize="none", // to eliminate the First letter capitalized
        autoCorrect={false}, // to disable keyboard corrector
        placeholder="Digite seu usuário do Github"
        placeholderTextColor="#999"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

// in RN, by default all elements are trated as display: flex and flex-direction: "column"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  input: {
    height: 46,
    alignSelf: "stretch", //ocupate all width
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },

  button: {
    height: 46,
    alignSelf: "stretch", //ocupate all width
    backgroundColor: "#DF4723",
    borderRadius: 4,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
