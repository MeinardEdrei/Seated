import axiosInstance from "../services/axiosInstance";
import Constants from "expo-constants";
import { TokenService } from "../services/tokenService";

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
 */
export const loginWithGoogleBackend = async (
  idToken: string,
): Promise<BackendLoginResponse> => {
  try {
    const { data } = await axiosInstance.post<BackendLoginResponse>(
      "/User/google-login",
      { idToken },
    );
    console.log("Backend login successful:", data);
    return data;
  } catch (error) {
    console.error("Error during backend Google login:", error);
    throw new Error("Backend login failed.");
  }
};

// Email Sign In

export const sendLoginOtp = async (email: string): Promise<sendOtpResponse> => {
  try {
    const { data } = await axiosInstance.post<sendOtpResponse>(
      "/User/send-login-otp",
      { email },
      { timeout: 30000 } // Override timeout 
    );
    console.log("Login OTP sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending login OTP:", error);
    throw new Error("Failed to send login OTP.");
  }
};

export const sendOtpToEmail = async (
  email: string,
): Promise<sendOtpResponse> => {
  try {
    const { data } = await axiosInstance.post<sendOtpResponse>(
      "/User/send-signup-otp",
      { email },
      { timeout: 30000 } // Override timeout 
    );
    console.log("OTP sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending OTP to email:", error);
    throw new Error("Sending OTP failed.");
  }
};

export const signUpOtp = async (
  email: string,
  otp: string,
): Promise<signUpOtpResponse> => {
  try {
    const { data } = await axiosInstance.post<signUpOtpResponse>(
      "/User/sign-up",
      { email, OtpCode: otp },
    );
    console.log("Sign Up OTP verified successfully:", data);
    return data;
  } catch (error) {
    console.error("Error verifying Sign Up OTP:", error);
    throw new Error("Sign Up OTP verification failed.");
  }
};

// Sign Out from backend

export const signOutBackend = async (): Promise<{
  success: boolean;
  sessionExpired?: boolean;
}> => {
  try {
    // axiosInstance will automatically handle token validation and refresh
    const { data } = await axiosInstance.post("/User/logout");

    console.log("Backend sign out successful:", data);
    return { success: true };
  } catch (error: any) {
    // If 401 after retry, session expired
    if (error.response?.status === 401) {
      console.log("Session expired on backend");
      await TokenService.clearAuthData();
      return { success: true, sessionExpired: true };
    }

    console.error("Error signing out from backend:", error);
    throw new Error("Sign out from backend failed.");
  }
};

export const loginWithEmailBackend = async (
  email: string,
): Promise<BackendLoginResponse> => {
  try {
    const { data } = await axiosInstance.post<BackendLoginResponse>(
      "/User/email-login",
      { email },
    );
    console.log("Backend email login successful:", data);
    return data;
  } catch (error) {
    console.error("Error during backend email login:", error);
    throw new Error("Backend email login failed.");
  }
};

export const verifyLoginOtp = async (
  email: string,
  otp: string,
): Promise<BackendLoginResponse> => {
  try {
    const { data } = await axiosInstance.post<BackendLoginResponse>(
      "/User/verify-login-otp",
      { email, otpCode: otp },
    );
    console.log("Login OTP verified successfully:", data);
    return data;
  } catch (error) {
    console.error("Error verifying login OTP:", error);
    throw new Error("Login OTP verification failed.");
  }
};

