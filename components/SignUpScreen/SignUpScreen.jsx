import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import auth from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getIdToken, getAuth } from "firebase/auth";
import { errorHandle } from "../LoginScreen/errorHandle";
import { COLORS } from "../../styles";
import { SCREEN_NAMES } from "../../util/constants";
import { useNavigation, useRoute } from "@react-navigation/native";

const SignUp = () => {
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const route = useRoute();

  async function fetchToken() {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser);
    return token;
  }

  const handleSignUp = async (email, password) => {

    await AsyncStorage.setItem('@SignUpProcess', 'INCOMPLETE');

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;
        const token = await fetchToken();

        return { uid, token };
      })
      .then(({ uid, token }) => {
        navigation.navigate(SCREEN_NAMES.USER_INFO, {
          email,
          userId: uid,
          userToken: token,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage + " " + errorCode);
        setError(errorCode);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.grey }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Sign Up</Text>
        <Text style={styles.subheading}>Create an account to start</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            handleSignUp(values.email, values.password);
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

              {error && (
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.error}>{errorHandle(error)}</Text>
                </View>
              )}

              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.button, { backgroundColor: COLORS.blue }]}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </View >
  );
};

export default SignUp;
