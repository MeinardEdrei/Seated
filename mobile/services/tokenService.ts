import { jwtDecode } from "jwt-decode";
import { Storage } from "../utils/storage";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL + "/api";
const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

export class TokenService {
  private static refreshPromise: Promise<any> | null = null;

  // Check if token is expired or will expire soon (within 5 minutes)
  static isTokenExpired(token: string | null): boolean {
    if (!token) return true;

    try {
      const decoded: any = jwtDecode(token);
      const expirationTime = decoded.exp * 1000;
      const bufferTime = 5 * 60 * 1000; // 5 minutes buffer
      return expirationTime < Date.now() + bufferTime;
    } catch (e) {
      console.error("Error decoding token:", e);
      return true;
    }
  }

    // Attempt to refresh tokens using the refresh token
    // Prevents multiple simultaneous refresh calls
   
  static async refreshTokens(): Promise<{
    success: boolean;
    accessToken?: string;
    refreshToken?: string;
  }> {
    // If already refreshing, return the existing promise
    if (this.refreshPromise) {
      console.log("Token refresh already in progress, waiting...");
      return this.refreshPromise;
    }

    this.refreshPromise = this._performRefresh();

    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.refreshPromise = null;
    }
  }

  private static async _performRefresh(): Promise<{
    success: boolean;
    accessToken?: string;
    refreshToken?: string;
  }> {
    try {
      const storedRefreshToken = await Storage.getItem(REFRESH_TOKEN_KEY);

      if (!storedRefreshToken) {
        return { success: false };
      }

      const response = await axios.post(`${API_URL}/User/refresh`, {
        refreshToken: storedRefreshToken,
      });

      const { accessToken, refreshToken } = response.data;

      if (accessToken && refreshToken) {
        await Storage.setItem(TOKEN_KEY, accessToken);
        await Storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        return { success: true, accessToken, refreshToken };
      }

      return { success: false };
    } catch (error) {
      console.error("Token refresh failed:", error);
      return { success: false };
    }
  }

    // Get valid access token, refreshing if necessary
  static async getValidAccessToken(): Promise<string | null> {
    const accessToken = await Storage.getItem(TOKEN_KEY);

    if (!this.isTokenExpired(accessToken)) {
      return accessToken;
    }

    console.log("Access token expired, attempting refresh...");
    const refreshResult = await this.refreshTokens();

    if (refreshResult.success && refreshResult.accessToken) {
      return refreshResult.accessToken;
    }

    return null;
  }

    // Clear all authentication data from storage
  static async clearAuthData(): Promise<void> {
    await Storage.removeItem(TOKEN_KEY);
    await Storage.removeItem(REFRESH_TOKEN_KEY);
    await Storage.removeItem(USER_KEY);
  }
}
