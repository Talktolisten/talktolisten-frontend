import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Animated
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

import styles from "./styles.js";
import { COLORS, FONTSIZE, FONT_WEIGHT } from "../../styles/index.js";
import WelcomeBackground from "../../assets/auth/background.jpg";
import robotImage1 from "../../assets/auth/robot1.png";
import robotImage2 from "../../assets/auth/robot2.png";
import { SCREEN_NAMES } from "../../util/constants.js";

const Welcome = () => {
  const navigation = useNavigation();

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.grey }}>
      <View style={styles.BackgroundContainer}>
        <ImageBackground
          source={WelcomeBackground}
          style={styles.Background}
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
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.grey, borderColor: COLORS.black, borderWidth: 2 }]}
          onPress={() => navigation.navigate(SCREEN_NAMES.LOGIN)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.buttonText}>
              Log in
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREEN_NAMES.SIGNUP)}
        >
          <LinearGradient
            colors={['rgba(150,139,173,255)',
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.buttonText}>
              Sign up
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View >
  );
};

export default Welcome;
