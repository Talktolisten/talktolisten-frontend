import * as SecureStore from 'expo-secure-store';

export const storeUserID = async (userID) => {
  try {
    const userString = JSON.stringify(userID);
    await SecureStore.setItemAsync('user_id', userString);
  } catch (error) {
    console.error('Error storing the user:', error);
  }
};


export const getUserID = async () => {
  try {
    const userString = await SecureStore.getItemAsync('user_id');
    if (userString) {
      return JSON.parse(userString);
    } else {
      console.log("No user found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving the user:", error);
    return null;
  }
};


export const storeTokens = async (accessToken) => {
  try {
    const tokens = JSON.stringify({ accessToken });
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