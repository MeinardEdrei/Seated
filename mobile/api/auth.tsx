import axios from "axios";

const API_BASE_URL = "http://192.168.1.48:5165";

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
