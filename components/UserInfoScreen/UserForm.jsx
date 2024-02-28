// UserForm.js

import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import { TextInput } from 'react-native-paper';
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
          mode="outlined"
          label={"Username"}
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
          mode="outlined"
          label={"First Name"}
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
          mode="outlined"
          label={"Last Name"}
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
          onChangeText={(value) => {
            const numericValue = value.replace(/[^0-9]/g, '');
            let formattedValue = numericValue;

            if (numericValue.length <= 2) {
              formattedValue = numericValue;
            } else if (numericValue.length <= 4) {
              formattedValue = numericValue.substring(0, 2) + ' / ' + numericValue.substring(2);
            } else {
              formattedValue = numericValue.substring(0, 2) + ' / ' + numericValue.substring(2, 4) + ' / ' + numericValue.substring(4);
            }

            handleChange('dob')(formattedValue);
          }}
          onBlur={handleBlur('dob')}
          value={values.dob}
          placeholder="MM / DD / YYYY"
          style={styles.input}
          keyboardType="numeric"
          maxLength={14}
          mode="outlined"
          label={"Date of Birth"}
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
