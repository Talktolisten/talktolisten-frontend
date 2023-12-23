import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import ProfileScreen from '../screens/ProfileScreen';
// import ChatScreen from '../screens/ChatScreen';
// import HomeStack from './HomeStack';
// import IconButton from '../components/UI/IconButton';

import { SCREEN_NAMES } from '../util/constants';
import { getIcon } from '../components/Icons';
import { COLORS, FONT_NUNITO } from '../styles';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const screenOptions = ({ navigation }) => {
    return {
      headerShown: false,
      tabBarActiveTintColor: COLORS.yellow_dark,
      tabBarInactiveTintColor: COLORS.yellow_dark,
      tabBarStyle: {
        borderTopWidth: 0,
        borderTopColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
      },
      tabBarLabelStyle: {
        fontSize: 11,
        color: COLORS.black,
        fontFamily: FONT_NUNITO.bold,
      },

      headerLeft: () => {
        return (
          <IconButton
            containerStyle={{ marginLeft: 26 }}
            iconName={'ion:arrow-back'}
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
        name={SCREEN_NAMES.HOME_TAB}
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) =>
            getIcon(
              focused
                ? 'material-symbols:home-rounded'
                : 'material-symbols:home-outline-rounded',
              35,
              color,
            ),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.CHAT}
        component={ChatScreen}
        options={{
          headerShown: true,
          tabBarVisible: false,
          tabBarStyle: { display: 'none' },
          headerTitle: '',
          headerBackTitle: '',
          headerTransparent: true,
          tabBarIcon: ({ color, size }) =>
            getIcon('material-symbols:voice-chat-outline-rounded', 35, color),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            getIcon(
              focused ? 'mdi:user-circle' : 'mdi:user-circle-outline',
              35,
              color,
            ),
        }}
      />

      {/* <Tab.Screen
        name={SCREEN_NAMES.AUDIO_PLAYER}
        component={AudioScreen}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarVisible: false,
          tabBarIcon: () => null,
          tabBarButton: () => null,
          tabBarIconStyle: { display: 'none' },
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
