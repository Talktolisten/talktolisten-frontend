import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import AuthScreen from '../screens/AuthScreen';
// import WelcomeScreen from '../screens/WelcomeScreen';
// import MoodCheckScreen from '../screens/MoodCheckScreen';

// import IconButton from '../components/UI/IconButton';

import { SCREEN_NAMES } from '../util/constants';
import { COLORS } from '../styles';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const screenOptions = ({ navigation }) => ({
    headerTitle: '',
    headerBackTitle: '',
    headerTransparent: Platform.OS !== 'android',
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
        <IconButton
          containerStyle={{ marginLeft: 10 }}
          iconName={'ion:arrow-back'}
          iconSize={30}
          iconColor={COLORS.black}
          onPress={canGoBack ? navigation.goBack : null}
        />
      );
    },
  });

  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.WELCOME}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name={SCREEN_NAMES.WELCOME}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={SCREEN_NAMES.AUTH} component={AuthScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.MOOD_CHECK}
        component={MoodCheckScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
