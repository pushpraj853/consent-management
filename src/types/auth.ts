import { UserDataType } from "./userDataTypes";

export interface AuthRequestType {
  username: string;
  password: string;
}
export interface AuthResponseType extends UserDataType {
  accessToken: string;
}
