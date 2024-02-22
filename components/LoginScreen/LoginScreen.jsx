import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { storeTokens, storeUserID } from "../../util/tokenUtils.js"
import { setUserID } from "../../redux/actions/userActions";

import { SCREEN_NAMES } from "../../util/constants";
import styles from "./styles";
import { COLORS, FONTSIZE, FONT_WEIGHT } from "../../styles";
import auth from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { errorHandle } from "./errorHandle";

const loginwithemail = async (email, password, navigation, setError, dispatch) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      const { accessToken } = user.stsTokenManager;
      await storeTokens(accessToken);
      await storeUserID(user.uid);
      dispatch(setUserID(user.uid));
      await AsyncStorage.setItem('@SignUpProcess', 'COMPLETE');
    })
    .then(() => navigation.navigate(SCREEN_NAMES.NAV_TAB))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage + " " + errorCode);
      setError(errorCode);
    });
};

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <Text style={styles.subheading}>Let's talk</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          loginwithemail(values.email, values.password, navigation, setError, dispatch);
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

            <TouchableOpacity
              style={{
                width: "95%",
                fontWeight: FONT_WEIGHT.bold,
                justifyContent: "center",
                textAlign: "center",
              }}
              onPress={() => navigation.navigate(SCREEN_NAMES.RESET_PASSWORD)}
            >
              <Text
                style={{
                  textAlign: "right",
                  fontSize: FONTSIZE.xSmall,
                  fontWeight: FONT_WEIGHT.regular
                }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>

            {error && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.error}>{errorHandle(error)}</Text>
              </View>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.button, { backgroundColor: COLORS.blue }]}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.black }]}
      >
        <Text style={styles.buttonText}>Log in using Apple ID</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.white }]}
      >
        <Text style={[styles.buttonText, { color: COLORS.black }]}>
          Log in using Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 30,
          fontWeight: FONT_WEIGHT.bold,
          justifyContent: "center",
          textAlign: "center",
        }}
        onPress={() => navigation.navigate(SCREEN_NAMES.SIGNUP)}
      >
        <Text style={{
          textAlign: "center",
          fontWeight: FONT_WEIGHT.bold,
          fontSize: FONTSIZE.small
        }}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
