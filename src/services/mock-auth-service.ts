import {
  AuthResponseType,
  ForgotPasswordRequestType,
  ForgotPasswordResponseType,
  LoginRequestType,
  SendOtpRequestType,
} from "../types";
import { ApiResponse } from "../types";

const MOCK_DELAY_MS = 800;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_OTP = "123456";
const MOBILE_REGEX = /^[6-9]\d{9}$/;

const createMockToken = (identifier: string): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: "mock-user-1",
      mobile: identifier,
      userRole: "admin",
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    }),
  );
  return `${header}.${payload}.mock-signature`;
};

const createMockUser = (
  mobile: string,
  firstName = "Demo",
  lastName = "User",
): AuthResponseType => ({
  id: "mock-user-1",
  email: `${mobile}@mock.local`,
  username: mobile,
  firstName,
  lastName,
  accessToken: createMockToken(mobile),
});

export const MOCK_AUTH_ENDPOINTS = [
  "/auth/send-otp",
  "/auth/login",
  "/auth/forgot-password",
] as const;

export const isMockAuthEndpoint = (url: string): boolean =>
  MOCK_AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));

export const handleMockAuthRequest = async <T>(
  url: string,
  payload: Record<string, unknown> = {},
): Promise<ApiResponse<T>> => {
  await delay(MOCK_DELAY_MS);

  if (url.includes("/auth/send-otp")) {
    const { mobile } = payload as unknown as SendOtpRequestType;

    if (!mobile) {
      throw new Error("Mobile number is required.");
    }

    if (!MOBILE_REGEX.test(mobile)) {
      throw new Error("Please enter a valid 10-digit mobile number.");
    }

    return {
      data: {
        message: `OTP sent to +91 ${mobile}. Use ${MOCK_OTP} for mock login.`,
      } as T,
      message: "OTP sent successfully",
      error: false,
    };
  }

  if (url.includes("/auth/login")) {
    const { mobile, otp } = payload as unknown as LoginRequestType;

    if (!mobile || !otp) {
      throw new Error("Mobile number and OTP are required.");
    }

    if (!MOBILE_REGEX.test(mobile)) {
      throw new Error("Please enter a valid 10-digit mobile number.");
    }

    if (otp !== MOCK_OTP) {
      throw new Error("Invalid OTP. Please try again.");
    }

    return {
      data: createMockUser(mobile) as T,
      message: "Login successful",
      error: false,
    };
  }

  if (url.includes("/auth/forgot-password")) {
    const { email } = payload as unknown as ForgotPasswordRequestType;

    if (!email) {
      throw new Error("Email is required.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please enter a valid email address.");
    }

    return {
      data: {
        message: `If an account exists for ${email}, a reset link has been sent.`,
      } as T,
      message: "Reset link sent",
      error: false,
    };
  }

  throw new Error("Unknown mock auth endpoint");
};

export type { AuthResponseType, ForgotPasswordResponseType };
