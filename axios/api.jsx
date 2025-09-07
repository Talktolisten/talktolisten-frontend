import axios from "axios";
import { getTokens } from "../util/tokenUtils";
import { Platform } from "react-native";

export const URL =
  Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_API_URL_ANDROID;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (!error.response) {
      error.response = {
        data: "Connection error",
        status: 500,
      };
    }
    if (error.response.status === 401) {
      console.log("Unauthorized: Your session has expired");
    }
    return Promise.reject(error);
  },
);

const Api = async (config) => {
  if (
    config.url.startsWith("api/v1/user/check_username") ||
    config.url.startsWith("api/v1/user/signup")
  ) {
    config.baseURL = URL;
    return axios(config);
  }
  const token = await getTokens();
  const { accessToken } = token;

  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  config.baseURL = URL;
  return axios(config);
};

export default Api;
