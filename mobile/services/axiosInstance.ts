import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import { TokenService } from "./tokenService";

const API_URL = Constants.expoConfig?.extra?.API_URL + "/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach valid token to every request
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Skip token attachment for auth endpoints
    const isAuthEndpoint = 
      config.url?.includes("/google-login") ||
      config.url?.includes("/email-login") ||
      config.url?.includes("/sign-up") ||
      config.url?.includes("/refresh") ||
      config.url?.includes("/send-signup-otp") ||
      config.url?.includes("/send-login-otp") ||
      config.url?.includes("/verify-login-otp");

    if (!isAuthEndpoint) {
      const token = await TokenService.getValidAccessToken();
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors and retry with refreshed token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If 401 error and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.log("401 error detected, attempting token refresh...");
      
      const refreshResult = await TokenService.refreshTokens();

      if (refreshResult.success && refreshResult.accessToken) {
        // Update the failed request with new token and retry
        originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`;
        return axiosInstance(originalRequest);
      }

      // Refresh failed - session expired
      console.log("Token refresh failed, session expired");
      await TokenService.clearAuthData();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
