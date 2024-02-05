import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { storeTokens, storeUserID } from "../util/tokenUtils";
import AuthStack from "./AuthStack";
import TabNavigator from "./TabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Introduction from "../components/IntroductionScreen/Introduction";
import auth from "../firebase";
import UserInfo from "../components/UserInfoScreen/UserInfoScreen";

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

const Nav = () => {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (err) {
      Alert.alert("Error", "Please restart the application.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
    const auth = getAuth(); 
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const { accessToken, refreshToken } = user.stsTokenManager;
          await storeTokens(accessToken, refreshToken); 
          await storeUserID(user.uid);
          setUserToken(token);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching user token:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe; // Clean up on unmount
  }, []);  

  return (
    <NavigationContainer>
      {loading ? (
        <Loading />
      ) : isLoggedIn === null ? (
        <Loading />
      ) : isLoggedIn ? (
        <TabNavigator />
      ) : viewedOnboarding ? (
        <AuthStack />
      ) : (
        <Introduction setViewedOnboarding={setViewedOnboarding} />
      )}
    </NavigationContainer>
  );
};

export default Nav;
