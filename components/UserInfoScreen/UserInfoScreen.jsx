import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "./styles";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { COLORS } from "../../styles";
import { Feather } from "@expo/vector-icons";

const UserInfo = ({ navigation, route }) => {
  const { email } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Create Profile</Text>
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
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.button, { backgroundColor: COLORS.black }]}
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
