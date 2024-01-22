import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExploreScreen from "../screens/Explore";
import ChatStack from "./ChatStack";
import ProfileScreen from "../screens/Profile";

import { SCREEN_NAMES } from "../util/constants";
import { COLORS } from "../styles";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const screenOptions = ({ navigation }) => ({
    headerTitle: "",
    headerBackTitle: "",
    headerTransparent: Platform.OS !== "android",
    headerStyle: {
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
    // headerLeft: () => {
    //   return (
    //     <IconButton
    //       containerStyle={{ marginLeft: 10 }}
    //       iconName={"ion:arrow-back"}
    //       iconSize={30}
    //       iconColor={COLORS.black}
    //       onPress={navigation.canGoBack ? navigation.goBack : null}
    //     />
    //   );
    // },
  });

  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.EXPLORE}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name={SCREEN_NAMES.EXPLORE}
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"ChatStack"}
        component={ChatStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.PROFILE}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
