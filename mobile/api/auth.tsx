import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL; 

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

/**
 * Sends the Google ID Token to your backend to be verified.
 * Receives your app's own JWTs (access & refresh) in return.
 */
export const loginWithGoogleBackend = async (idToken: string): Promise<BackendLoginResponse> => {
  try {
    const { data } = await axios.post<BackendLoginResponse>(`${API_URL}/google-login`, {
      idToken: idToken,
    });
    console.log("Backend login successful:", data);
    return data;
  } catch (error) {
    console.error('Error during backend Google login:', error);
    throw new Error('Backend login failed.');
  }
};

