import axios from "axios";
import { Storage } from "../utils/storage";
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

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
      `${API_URL}/User/send-signup-otp`,
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
        OtpCode: otp,
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
  const accessToken = await Storage.getItem("accessToken");
  if (!accessToken) {
    console.log("No access token found, user is already signed out.");
    return;
  }

  try {
    const res = await authFetch("/user/logout", {
      method: "POST",
    });

    const data = await res.json();
    console.log("Signed out from backend successfully", data);
    return data;
  } catch (error) {
    console.error("Error signing out from backend:", error);
    console.log("API_URL used:", API_URL);
    throw new Error("Sign out from backend failed.");
  }
};

export const loginWithEmailBackend = async (
  email: string,
): Promise<BackendLoginResponse> => {
  try {
    const { data } = await axios.post<BackendLoginResponse>(
      `${API_URL}/User/email-login`,
      {
        email: email,
      },
    );
    console.log("Backend email login successful:", data);
    return data;
  } catch (error) {
    console.error("Error during backend email login:", error);
    console.log("API_URL used:", API_URL);
    throw new Error("Backend email login failed.");
  }
};

export const sendLoginOtp = async (email: string): Promise<sendOtpResponse> => {
  try {
    const { data } = await axios.post<sendOtpResponse>(
      `${API_URL}/User/send-login-otp`,
      { email },
    );
    console.log("Login OTP sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending login OTP:", error);
    throw new Error("Failed to send login OTP.");
  }
};

export const verifyLoginOtp = async (
  email: string,
  otp: string,
): Promise<BackendLoginResponse> => {
  try {
    const { data } = await axios.post<BackendLoginResponse>(
      `${API_URL}/User/verify-login-otp`,
      { email, otpCode: otp },
    );
    console.log("Login OTP verified successfully:", data);
    return data;
  } catch (error) {
    console.error("Error verifying login OTP:", error);
    throw new Error("Login OTP verification failed.");
  }
};

// Token Refresh Handling Section
function isTokenExpired(token: string) {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
}

export async function authFetch(endpoint: string, options: any = {}) {
  let accessToken = await Storage.getItem("accessToken");
  const refreshToken = await Storage.getItem("refreshToken");

  // If token expired - refresh
  if (accessToken && isTokenExpired(accessToken)) {
    const refreshed = await refreshTokens(refreshToken);

    if (!refreshed.success) {
      throw new Error("Refresh failed — user must log in again");
    }

    accessToken = refreshed.accessToken;
  }

  // Perform request
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}

async function refreshTokens(refreshToken: string | null) {
  if (!refreshToken) return { success: false };

  const res = await fetch(`${API_URL}/user/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return { success: false };

  const data = await res.json();

  await Storage.setItem("accessToken", data.accessToken);
  await Storage.setItem("refreshToken", data.refreshToken);

  return { success: true, ...data };
}
