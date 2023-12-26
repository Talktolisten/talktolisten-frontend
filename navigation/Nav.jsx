// import { NavigationContainer } from '@react-navigation/native';

// import AuthStack from './AuthStack';
// import TabNavigator from './TabNavigator';

// const Nav = () => {
//   const isLoggedIn = false;
//   return (
//     <NavigationContainer>
//       {isLoggedIn ? <TabNavigator /> : <AuthStack />}
//     </NavigationContainer>
//   );
// };

// export default Nav;

//NOTE: The code below will need to be refactored once authentication is implemented. The code commented out above is the logic for authorization.
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Introduction from "../components/IntroductionScreen/Introduction";
import AuthStack from "./AuthStack";

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

  const checkOnboarding = async () => {
    try {
      // const value = await AsyncStorage.getItem("@viewedOnboarding");
      // if (value !== null) {
      //   setViewedOnboarding(true);
      // }
    } catch (err) {
      Alert.alert("Error", "Please restart the application.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <NavigationContainer>
      {loading ? (
        <Loading />
      ) : viewedOnboarding ? (
        <AuthStack />
      ) : (
        <Introduction setViewedOnboarding={setViewedOnboarding} />
      )}
    </NavigationContainer>
  );
};

export default Nav;
