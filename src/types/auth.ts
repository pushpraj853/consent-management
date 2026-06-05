export interface LoginRequestType {
  phoneNumber: string;
  otp: string;
}

export interface SendOtpRequestType {
  phoneNumber: string;
}

export interface SendOtpResponseType {
  message: string;
}

export interface ForgotPasswordRequestType {
  email: string;
}

export interface LoginAuthDataType {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  cvUserId: string;
}

export type AuthResponseType = LoginAuthDataType;

export interface ForgotPasswordResponseType {
  message: string;
}

/** @deprecated Use LoginRequestType */
export interface AuthRequestType {
  username: string;
  password: string;
}
