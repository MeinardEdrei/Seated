import axios from "axios";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig?.extra?.API_URL;

export const googleLogin = async (token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/User/google-login`, {
        idToken: token,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Backend Error:", error.response.data);
      throw error.response.data;
    } else {
      console.error("Network or other Error:", error.message);
      throw error;
    }
  }
};
