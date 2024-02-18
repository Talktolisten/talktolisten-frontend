import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Text, SafeAreaView} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "./styles";
import { Formik } from "formik";
import auth from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import UserForm from "./UserForm";
import { SCREEN_NAMES } from "../../util/constants";
import { create_user } from "../../axios/user";
import { getIdToken, getAuth } from "firebase/auth";
import { storeTokens, storeUserID } from "../../util/tokenUtils";
import { setUserID } from "../../redux/actions/userActions";

const UserInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { email, password } = route.params || {};

  async function fetchToken() {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser);
    return token;
  }
  
  const signupwithemail = async (email, password, values) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;
        const token = await fetchToken();
        await storeTokens(token); 
        await storeUserID(uid);
        
        dispatch(setUserID(uid));
        const { username, fname: first_name, lname: last_name, dob } = values;
        return create_user(uid, username, email, first_name, last_name, dob);
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
        initialValues={{ username: "", dob: "", fname: "", lname: "" }}
        onSubmit={async (values) => {
          await signupwithemail(email, password, values);
        }}
      >

        {(formikProps) => <UserForm {...formikProps} />}

      </Formik>
    </SafeAreaView>
  );
};

export default UserInfo;
