import axios from "axios";
import Constants from "expo-constants";
import { Storage } from "../utils/storage";

const API_URL = Constants.expoConfig?.extra?.API_URL + "/api";

// Define the types for your backend response
type User = {
  id: string;
  email: string;
  role: string;
};

type BackendLoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

type sendOtpResponse = {
  success: boolean;
  message: string;
};

type signUpOtpResponse = {
  success: boolean;
  message: string;
  role: string;
};

/**
 * Sends the Google ID Token to your backend to be verified.
 * Receives your app's own JWTs (access & refresh) in return.
 */
export const loginWithGoogleBackend = async (
  idToken: string,
): Promise<BackendLoginResponse> => {
  try {
    const { data } = await axios.post<BackendLoginResponse>(
      `${API_URL}/User/google-login`,
      {
        idToken: idToken,
      },
    );
    console.log("Backend login successful:", data);
    return data;
  } catch (error) {
    console.error("Error during backend Google login:", error);
    console.log("API_URL used:", API_URL);
    throw new Error("Backend login failed.");
  }
};

// Email Sign In

export const sendOtpToEmail = async (
  email: string,
): Promise<sendOtpResponse> => {
  try {
    const { data } = await axios.post<sendOtpResponse>(
      `${API_URL}/User/send-otp`,
      {
        email: email,
      },
    );
    console.log("OTP sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending OTP to email:", error);
    console.log("API_URL used:", API_URL);
    throw new Error("Sending OTP failed.");
  }
};

// Sign Up / Verify - OTP
export const signUpOtp = async (
  email: string,
  otp: string,
): Promise<signUpOtpResponse> => {
  try {
    const { data } = await axios.post<signUpOtpResponse>(
      `${API_URL}/User/sign-up`,
      {
        email: email,
        otp: otp,
      },
    );
    console.log("Sign Up OTP verified successfully:", data);
    return data;
  } catch (error) {
    console.error("Error verifying Sign Up OTP:", error);
    console.log("API_URL used:", API_URL);
    throw new Error("Sign Up OTP verification failed.");
  }
};

// Sign Out from backend

export const signOutBackend = async () => {
  try {
    const accessToken = await Storage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found for sign out.");
    }

    const { data } = await axios.post(`${API_URL}/User/logout`, {}, {headers: {
      Authorization: `Bearer ${accessToken}`,
    }});

    console.log("Signed out from backend successfully");
    return data;
  } catch (error) {
    console.error("Error signing out from backend:", error);
    console.log("API_URL used:", API_URL);
    throw new Error("Sign out from backend failed.");
  }
};
