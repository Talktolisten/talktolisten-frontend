import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Animated
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from 'react-native-paper';
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
import loginBackground from "../../assets/auth/login_background.jpg";
import robotImage1 from "../../assets/auth/robot1.png";
import robotImage2 from "../../assets/auth/robot2.png";

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

  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim1, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim2, {
      toValue: 1,
      duration: 2000,
      delay: 1000, // delay the second animation
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.grey }}>
        <View style={styles.loginBackgroundContainer}>
          <ImageBackground
            source={loginBackground}
            style={styles.loginBackground}
          >
            <Text style={styles.heading}>Welcome to Talk To Listen</Text>
            <Text style={styles.subheading}>Let's talk</Text>
            <Animated.Image
              source={robotImage1}
              style={{ ...styles.robotImage1, opacity: fadeAnim1 }}
            />
            <Animated.Image
              source={robotImage2}
              style={{ ...styles.robotImage2, opacity: fadeAnim2 }}
            />
          </ImageBackground>
        </View>
        <SafeAreaView style={styles.container}>
          <Text style={styles.loginHeading}>Login</Text>
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
                    mode="outlined"
                    label={"Email"}
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
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          {/* <TouchableOpacity
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
        </TouchableOpacity> */}

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
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
