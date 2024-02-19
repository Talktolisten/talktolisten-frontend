import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import ProfileScreen from "../screens/Profile";
import UserProfileScreen from "../screens/UserProfile";
import EditProfileScreen from "../screens/EditProfile";
import SettingsScreen from "../screens/Settings";
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
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name={SCREEN_NAMES.EDIT_PROFILE}
                component={EditProfileScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen name={SCREEN_NAMES.SETTINGS}
                component={SettingsScreen}
                options={{ headerShown: false }}
            /> */}
        </Stack.Navigator>
    );
};

export default ProfileStack;
