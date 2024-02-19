import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/Signup";
import ResetPasswordScreen from "../screens/ResetPassword";

import { SCREEN_NAMES } from "../util/constants";
import { COLORS } from "../styles";
import UserInfoScreen from "../screens/UserInfo";
import HomeStack from "./HomeStack";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const screenOptions = ({ navigation }) => ({
    headerTitle: "",
    headerBackTitle: "",
    headerTransparent: Platform.OS !== "android",
    headerStyle: {
      backgroundColor: COLORS.white,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      borderWidth: 0,
      shadowColor: COLORS.white,
      shadowOffset: {
        height: 0,
      },
      shadowRadius: 0,
    },
    headerLeft: ({ canGoBack }) => {
      return (
        <AntDesign
          name="arrowleft"
          size={24}
          color={COLORS.black}
          onPress={canGoBack ? navigation.goBack : null}
          containerStyle={{ marginLeft: 10 }}
        />
      );
    },
  });

  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.LOGIN}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name={SCREEN_NAMES.LOGIN}
        component={LoginScreen}
        options={{ headerLeft: () => null }}
      />
      <Stack.Screen name={SCREEN_NAMES.SIGNUP}
        component={SignUpScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.RESET_PASSWORD}
        component={ResetPasswordScreen}
      />
      <Stack.Screen name={SCREEN_NAMES.USER_INFO}
        component={UserInfoScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.HOME}
        component={HomeStack}
        options={{ headerLeft: () => null }}
        initialParams={{ email: "as", password: "s" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
