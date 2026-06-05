import { UserDataType } from "./userDataTypes";

export interface LoginRequestType {
  mobile: string;
  otp: string;
}

export interface SendOtpRequestType {
  mobile: string;
}

export interface SendOtpResponseType {
  message: string;
}

export interface ForgotPasswordRequestType {
  email: string;
}

export interface AuthResponseType extends UserDataType {
  accessToken: string;
}

export interface ForgotPasswordResponseType {
  message: string;
}

/** @deprecated Use LoginRequestType */
export interface AuthRequestType {
  username: string;
  password: string;
}
