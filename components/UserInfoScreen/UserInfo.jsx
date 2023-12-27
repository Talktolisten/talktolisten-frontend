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
import { Formik } from "formik";
import { COLORS } from "../../styles";
import { Feather } from "@expo/vector-icons";

const UserInfo = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>More Info</Text>
      <Formik
        initialValues={{ username: "", dob: "", age: "", fname: "", lname: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{ marginTop: 29 }}>
            <View style={styles.inputContainer}>
              <Feather
                name="at-sign"
                size={24}
                color={COLORS.black}
                style={styles.inputIcon}
              />
              <TextInput
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.email}
                placeholder="Username"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={24}
                color={COLORS.black}
                style={styles.inputIcon}
              />
              <TextInput
                onChangeText={handleChange("fname")}
                onBlur={handleBlur("fname")}
                value={values.email}
                placeholder="First Name"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={24}
                color={COLORS.black}
                style={styles.inputIcon}
              />
              <TextInput
                onChangeText={handleChange("lname")}
                onBlur={handleBlur("lname")}
                value={values.email}
                placeholder="Last Name"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <AntDesign
                name="calendar"
                size={24}
                color={COLORS.black}
                style={styles.inputIcon}
              />
              <TextInput
                onChangeText={handleChange("dob")}
                onBlur={handleBlur("dob")}
                value={values.email}
                placeholder="Date of Birth"
                style={styles.input}
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.button, { backgroundColor: COLORS.blue }]}
            >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default UserInfo;
