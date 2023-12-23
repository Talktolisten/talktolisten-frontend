import * as Font from 'expo-font';

export const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
      'Nunito-Medium': require('../assets/fonts/Nunito-Medium.ttf'),
      'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
    });
  } catch (error) {
    console.log(error);
  }
};