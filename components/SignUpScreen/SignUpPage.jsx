import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import styles from "./styles";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { COLORS } from "../../styles";

const SignUp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <Text style={styles.subheading}>Create an account to start</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{ marginTop: 29 }}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={24}
                color={COLORS.black}
                style={styles.inputIcon}
              />
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <AntDesign
                name="lock1"
                size={24}
                color={COLORS.black}
                style={styles.inputIcon}
              />
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password"
                style={styles.input}
                secureTextEntry={true}
              />
            </View>

            <TouchableOpacity onPress={handleSubmit} style={[styles.button, { backgroundColor: COLORS.blue }]}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default SignUp;
