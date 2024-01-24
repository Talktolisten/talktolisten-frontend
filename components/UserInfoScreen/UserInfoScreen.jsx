import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "./styles";
import { Formik } from "formik";
import auth from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import UserForm from "./UserForm";

import { useNavigation, useRoute } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../util/constants";

const UserInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { email, password } = route.params || {};

  const signupwithemail = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        console.log(uid);
      })
      .then(() => {
        navigation.navigate(SCREEN_NAMES.HOME);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage + " " + errorCode);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Create Profile</Text>
      <Formik
        initialValues={{ username: "", dob: "", age: "", fname: "", lname: "" }}
        onSubmit={async (values) => {
          console.log(route.params.email, route.params.password, values);
          await signupwithemail(email, password);
        }}
      >

        {(formikProps) => <UserForm {...formikProps} />}

      </Formik>
    </SafeAreaView>
  );
};

export default UserInfo;
