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

import auth from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const firebasePassReset = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
      // ..
    });
};

const ResetPassword = () => {
  const [sent, setSent] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Reset Password</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          firebasePassReset(values.email);
          setSent(true);
          setFieldValue("email", "");
        }}
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

            {!sent ? (
              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.button, { backgroundColor: COLORS.black }]}
              >
                <Text style={styles.buttonText}>Send Verification Code</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: COLORS.green_light }]}
              >
                <Text style={styles.buttonText}>Check your email</Text>
              </TouchableOpacity>
            )}

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
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ResetPassword;
