import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import ProfileScreen from "../screens/Profile";
import UserProfileScreen from "../screens/UserProfile";
import LikedCharactersScreen from "../screens/LikedCharacters";
import CreatedCharactersScreen from "../screens/CreatedCharacters";
import EditProfileScreen from "../screens/EditProfile";
import EditCharacterScreen from "../screens/EditCharacter";
import SettingsScreen from "../screens/Settings";
import SelectVoiceScreen from "../screens/SelectVoice";
import ThemeSettingScreen from "../screens/ThemeSetting";
import NotificationScreen from "../screens/Notification";
import FeedbackScreen from "../screens/Feedback";
import ReportScreen from "../screens/Report";
import AboutScreen from "../screens/About";
import { SCREEN_NAMES } from "../util/constants";
import { COLORS } from "../styles";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
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
      initialRouteName={SCREEN_NAMES.PROFILE}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name={SCREEN_NAMES.PROFILE}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.USER_PROFILE}
        component={UserProfileScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.LIKED_CHARACTERS}
        component={LikedCharactersScreen}
        options={{ headerShown: true, headerTitle: "Liked Characters" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CREATED_CHARACTERS}
        component={CreatedCharactersScreen}
        options={{ headerShown: true, headerTitle: "Created Characters" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{ headerShown: true, headerTitle: "Edit Profile" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.EDIT_CHARACTER}
        component={EditCharacterScreen}
        options={{ headerShown: true, headerTitle: "Edit Character" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.SELECT_VOICE}
        component={SelectVoiceScreen}
        options={{ headerShown: true, headerTitle: "Select Voice" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.THEME_SETTING}
        component={ThemeSettingScreen}
        options={{ headerShown: true, headerTitle: "Theme" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.NOTIFICATION}
        component={NotificationScreen}
        options={{ headerShown: true, headerTitle: "Notification" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.FEEDBACK}
        component={FeedbackScreen}
        options={{ headerShown: true, headerTitle: "Contact us" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.REPORT}
        component={ReportScreen}
        options={{ headerShown: true, headerTitle: "Report" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.ABOUT_US}
        component={AboutScreen}
        options={{ headerShown: true, headerTitle: "About us" }}
      />
      {/* <Stack.Screen name={SCREEN_NAMES.SETTINGS}
                component={SettingsScreen}
                options={{ headerShown: false }}
            /> */}
    </Stack.Navigator>
  );
};

export default ProfileStack;
