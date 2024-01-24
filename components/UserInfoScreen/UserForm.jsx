// UserForm.js

import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../styles";
import styles from "./styles"; // Make sure to import your styles file

const UserForm = ({ values, handleChange, handleBlur, handleSubmit }) => {
  return (
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
          value={values.username}
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
          value={values.fname}
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
          value={values.lname}
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
          value={values.dob}
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
  );
};

export default UserForm;
