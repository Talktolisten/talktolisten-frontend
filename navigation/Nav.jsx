import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, ActivityIndicator, Alert } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { storeTokens, storeUserID, removeUserIDInStore } from "../util/tokenUtils";
import { setUserID, removeUserID } from "../redux/actions/userActions";
import AuthStack from "./AuthStack";
import TabNavigator from "./TabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Introduction from "../components/IntroductionScreen/Introduction";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (err) {
      Alert.alert("Error", `Please restart the application. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const checkSignUpCompletion = async () => {
    const signUpProcess = await AsyncStorage.getItem('@SignUpProcess');
    return signUpProcess === 'COMPLETE';
  };


  useEffect(() => {
    checkOnboarding();

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const hasCompletedSignUp = await checkSignUpCompletion();

        if (!hasCompletedSignUp) {
          setIsLoggedIn(false);
        } else {
          const { accessToken } = user.stsTokenManager;
          await storeTokens(accessToken);
          await storeUserID(user.uid);
          dispatch(setUserID(user.uid));
          setIsLoggedIn(true);
        }
      } else {
        removeUserIDInStore();
        dispatch(removeUserID());
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
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
