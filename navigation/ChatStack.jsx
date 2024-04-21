import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import ChatScreen from "../screens/Chat";
import CreateGroupChatScreen from "../screens/CreateGroupChat";
import MessageScreen from "../screens/Message";
import MessageGroupScreen from "../screens/MessageGroup";
import VoiceScreen from "../screens/Voice";
import { SCREEN_NAMES } from "../util/constants";
import { COLORS } from "../styles";

const Stack = createNativeStackNavigator();

const ChatStack = () => {
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
          containerStyle={{ marginLeft: 5 }}
        />
      );
    },
    headerRight: () => (
      <AntDesign
        name="close"
        size={24}
        color={COLORS.black}
        onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: SCREEN_NAMES.CHAT_TAB }],
        })}
        containerStyle={{ marginRight: 5 }}
      />
    ),
  });

  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.CHAT}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name={SCREEN_NAMES.CHAT}
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CREATE_GROUP_CHAT}
        component={CreateGroupChatScreen}
        options={{ headerShown: true, headerTitle: "Create Group Chat", headerRight: () => null }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.MESSAGE}
        component={MessageScreen}
        options={{ headerShown: true, headerTitle: "Message", headerRight: () => null }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.MESSAGE_GROUP}
        component={MessageGroupScreen}
        options={{ headerShown: true, headerTitle: "Group Chat", headerRight: () => null }}
      />
      <Stack.Screen name={SCREEN_NAMES.VOICE}
        component={VoiceScreen}
        options={{ headerShown: true, headerRight: () => null }}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
