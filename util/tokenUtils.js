import * as SecureStore from 'expo-secure-store';

export const storeTokens = async (accessToken, refreshToken) => {
  try {
    const tokens = JSON.stringify({ accessToken, refreshToken });
    await SecureStore.setItemAsync('firebaseTokens', tokens);
  } catch (error) {
    console.error('Error storing the tokens:', error);
  }
};


export const getTokens = async () => {
  try {
    const tokenString = await SecureStore.getItemAsync('firebaseTokens');
    if (tokenString) {
      return JSON.parse(tokenString);
    } else {
      console.log("No tokens found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving the tokens:", error);
    return null;
  }
};


export const removeTokens = async () => {
  try {
    await SecureStore.deleteItemAsync('firebaseTokens');
  } catch (error) {
    console.error("Error removing the tokens:", error);
  }
};