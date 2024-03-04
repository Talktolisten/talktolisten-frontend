import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Text, SafeAreaView, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "./styles";
import { COLORS } from "../../styles";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserForm from "./UserForm";
import { SCREEN_NAMES } from "../../util/constants";
import { create_user } from "../../axios/user";
import { storeTokens, storeUserID } from "../../util/tokenUtils";
import { setUserID } from "../../redux/actions/userActions";

const UserInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { email, userId, userToken } = route.params || {};

  const signupwithemail = async (values) => {
    try {
      await storeTokens(userToken);
      await storeUserID(userId);

      dispatch(setUserID(userId));
      const { username, fname: first_name, lname: last_name, dob } = values;
      await create_user(userId, username, email, first_name, last_name, dob);

      await AsyncStorage.setItem('@SignUpProcess', 'COMPLETE');

      navigation.navigate(SCREEN_NAMES.NAV_TAB);
    } catch (error) {
      console.log(error);
      const errorCode = error.response.data.error.code;
      const errorMessage = error.response.data.error.message;
      console.log(errorMessage + " " + errorCode);
      setError(errorCode);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.grey }}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.heading}>Create Profile</Text>
          <Formik
            initialValues={{ username: "", dob: "", fname: "", lname: "" }}
            onSubmit={async (values) => {
              if (values.dob === "") {
                values.dob = "01 / 01 / 1990";
              }
              await signupwithemail(values);
            }}
          >

            {(formikProps) => <UserForm {...formikProps} />}

          </Formik>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserInfo;
