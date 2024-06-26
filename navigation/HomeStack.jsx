import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExploreScreen from "../screens/Explore";
import ChatScreen from "../screens/Chat";
import MessageScreen from "../screens/Message";
import MessageGroupScreen from "../screens/MessageGroup";
import VoiceScreen from "../screens/Voice";
import IconButton from "../components/UI/IconButton";

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
    headerLeft: () => {
      return (
        <IconButton
          containerStyle={{ marginLeft: 10 }}
          iconName={"ion:arrow-back"}
          iconSize={30}
          iconColor={COLORS.black}
          onPress={navigation.canGoBack() ? navigation.goBack : null}
        />
      );
    },
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
        name={SCREEN_NAMES.CHAT}
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={SCREEN_NAMES.MESSAGE}
        component={MessageScreen}
        options={{ headerShown: true, headerTitle: "Message" }}
      />
      <Stack.Screen name={SCREEN_NAMES.MESSAGE_GROUP}
        component={MessageGroupScreen}
        options={{ headerShown: true, headerTitle: "Group Message" }}
      />
      <Stack.Screen name={SCREEN_NAMES.VOICE}
        component={VoiceScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
