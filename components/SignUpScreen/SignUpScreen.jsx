import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Linking
} from "react-native";

import styles from "./styles";
import Checkbox from 'expo-checkbox';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import auth from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getIdToken, getAuth, sendEmailVerification } from "firebase/auth";
import { errorHandle } from "../LoginScreen/errorHandle";
import { COLORS } from "../../styles";
import { SCREEN_NAMES, LINKS } from "../../util/constants";
import { useNavigation, useRoute } from "@react-navigation/native";

const SignUp = () => {
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [waitingEmailVerification, setWaitingEmailVerification] = useState(false);

  async function fetchToken() {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser);
    return token;
  }

  const handleSignUp = async (email, password) => {

    if (!isChecked) {
      setError("not-agree");
      return;
    }

    await AsyncStorage.setItem('@SignUpProcess', 'INCOMPLETE');
    createUserWithEmailAndPassword(auth, email, password, emailVerified = true)
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.grey }}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.heading}>Sign Up</Text>
          <Text style={styles.subheading}>Create an account to start</Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              if (waitingEmailVerification) {
                checkEmailVerification();
              } else {
                handleSignUp(values.email, values.password);
              }
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
                    activeOutlineColor={COLORS.black}
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
                    mode="outlined"
                    label={"Password"}
                    activeOutlineColor={COLORS.black}
                  />
                </View>

                {error && (
                  <View style={{ marginTop: 15, marginBottom: 15 }}>
                    <Text style={styles.error}>{errorHandle(error)}</Text>
                  </View>
                )}

                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={isChecked}
                    onValueChange={setChecked}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>
                    I agree to the
                    <Text onPress={() => Linking.openURL(LINKS.TTL_Terms_of_Use)} style={styles.link}>
                      {" "}Terms of Use{" "}
                    </Text>
                    and
                    <Text onPress={() => Linking.openURL(LINKS.TTL_Privacy_Policy)} style={styles.link}>
                      {" "}Privacy Policy{" "}
                    </Text>
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.button}
                >
                  <LinearGradient
                    colors={[
                      'rgba(208, 179, 184, 255)',
                      'rgba(237,196,132,255)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                    }}
                  />
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </View >
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
