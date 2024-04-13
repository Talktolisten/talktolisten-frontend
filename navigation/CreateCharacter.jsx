import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { CreateCharacterScreen, CreateCharacterScreen2, CreateCharacterScreen3, CreateCharacterScreen4, CreateCharacterScreen5 } from "../screens/CreateCharacter";
import ProfileScreen from "../screens/Profile";
import { SCREEN_NAMES } from "../util/constants";
import { COLORS } from "../styles";

const Stack = createNativeStackNavigator();

const CreateCharacterStack = () => {
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
          routes: [{ name: SCREEN_NAMES.HOME }],
        })}
        containerStyle={{ marginRight: 5 }}
      />
    ),
  });

  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.CREATE_CHARACTER}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name={SCREEN_NAMES.CREATE_CHARACTER}
        component={CreateCharacterScreen}
        options={{ headerShown: true, headerTitle: "Create your character", headerLeft: () => null }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.PROFILE}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CREATE_CHARACTER_2}
        component={CreateCharacterScreen2}
        options={{ headerShown: true, headerTitle: "Create character profile" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CREATE_CHARACTER_3}
        component={CreateCharacterScreen3}
        options={{ headerShown: true, headerTitle: "Generate character avatar" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CREATE_CHARACTER_4}
        component={CreateCharacterScreen4}
        options={{ headerShown: true, headerTitle: "Choose a voice" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CREATE_CHARACTER_5}
        component={CreateCharacterScreen5}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CreateCharacterStack;
