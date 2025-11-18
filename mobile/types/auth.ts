export type User = {
  id: string;
  email: string;
  role: string;
};

export type BackendLoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type sendOtpResponse = {
  success: boolean;
  message: string;
};

export type signUpOtpResponse = {
  success: boolean;
  message: string;
  role: string;
};
