import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
} from "react-native";

import { TextInput } from "react-native-paper";

import styles from "./styles";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { COLORS } from "../../styles";

import auth from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { SCREEN_NAMES } from "../../util/constants";

const firebasePassReset = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("email sent");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
    });
};

const ResetPassword = () => {
  const [sent, setSent] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Reset Password</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          firebasePassReset(values.email);
          setSent(true);
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
                mode="outlined"
                label={"Email"}
              />
            </View>

            {!sent ? (
              <TouchableOpacity
                onPress={() => {
                  handleSubmit();
                }}
                style={[styles.button, { backgroundColor: COLORS.black }]}
              >
                <Text style={styles.buttonText}>Send Verification Code</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(SCREEN_NAMES.LOGIN);
                }}
                style={[styles.button, { backgroundColor: COLORS.light_black }]}
              >
                <Text style={styles.buttonText}>Back To Login</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ResetPassword;
