import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ProfileStack from "./ProfileStack";
import ChatStack from "./ChatStack";
import HomeStack from "./HomeStack";
import IconButton from "../components/UI/IconButton";

import { SCREEN_NAMES } from "../util/constants";
import { getIcon } from "../components/Icons";
import { COLORS, FONT_NUNITO } from "../styles";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const screenOptions = ({ navigation, route }) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Chat";
    return {
      headerShown: false,
      tabBarActiveTintColor: COLORS.black,
      tabBarInactiveTintColor: COLORS.black,
      tabBarStyle: {
        borderTopWidth: 10,
        borderTopColor: "transparent",
        elevation: 0,
        shadowOpacity: 0.1,
        paddingTop: 5,
        display: routeName === "Message" ? "none" : "flex", // Hide tab bar in 'Message' screen
      },
      tabBarLabelStyle: {
        fontSize: 12,
        color: COLORS.black,
        fontFamily: FONT_NUNITO.bold,
        marginTop: 10,
      },

      headerLeft: () => {
        return (
          <IconButton
            containerStyle={{ marginLeft: 26 }}
            iconName={"ion:arrow-back"}
            iconSize={30}
            iconColor={COLORS.black}
            onPress={navigation.canGoBack ? navigation.goBack : null}
          />
        );
      },
    };
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={SCREEN_NAMES.HOME}
        component={HomeStack}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ focused, color, size }) =>
            getIcon(
              focused ? "ic:round-explore" : "ic:outline-explore",
              25,
              color
            ),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.CHAT_TAB}
        component={ChatStack}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ focused, color, size }) =>
            getIcon(focused ? "bi:chat-fill" : "bi:chat", 25, color),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.PROFILE_TAB}
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) =>
            getIcon(
              focused ? "mdi:user-circle" : "mdi:user-circle-outline",
              25,
              color
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
