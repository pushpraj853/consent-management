import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  COUNTRY_CONFIG,
  DEFAULT_COUNTRY,
  formatPhoneNumberForApi,
  SupportedCountry,
} from "@/components/shared/phone-number";
import { LOGIN_ENDPOINT, SEND_OTP_ENDPOINT } from "@/configs/endpoints";
import { useApiRequest } from "@/hooks";
import { PROTECTED_ROUTES_PATHS } from "@/routes";
import { persistor, store } from "@/store";
import { addUserCredential } from "@/store/slices";
import { AuthResponseType, SendOtpResponseType } from "@/types";
import { errorToast, successToast } from "@/utils";
import { getSafeRedirectPath, REDIRECT_QUERY_PARAM } from "@/utils/redirect";
import Login, { LoginStep } from "../components/Login";

type LoginFormData = {
  phoneNumber: string;
  otp: string;
};

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const OTP_REGEX = /^\d{6}$/;
const RESEND_COOLDOWN_SECONDS = 30;

const validatePhoneNumber = (
  phoneNumber: string,
  country: SupportedCountry,
): string | undefined => {
  if (!phoneNumber.trim()) {
    return "Mobile number is required.";
  }

  const { phoneLength } = COUNTRY_CONFIG[country];

  if (country === "IN" && !INDIAN_MOBILE_REGEX.test(phoneNumber)) {
    return "Please enter a valid 10-digit mobile number.";
  }

  if (phoneNumber.length !== phoneLength) {
    return `Please enter a valid ${phoneLength}-digit mobile number.`;
  }

  return undefined;
};

const validateOtp = (otp: string): string | undefined => {
  if (!otp.trim()) {
    return "OTP is required.";
  }
  if (!OTP_REGEX.test(otp)) {
    return "Please enter a valid 6-digit OTP.";
  }
  return undefined;
};

const LoginContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<LoginStep>("mobile");
  const [country, setCountry] = useState<SupportedCountry>(DEFAULT_COUNTRY);
  const [formData, setFormData] = useState<LoginFormData>({ phoneNumber: "", otp: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (step !== "otp" || resendCooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [step, resendCooldown]);

  const { makeApiCall: sendOtp, loading: sendingOtp } = useApiRequest<SendOtpResponseType>({
    endpointConfig: SEND_OTP_ENDPOINT,
    hitApiOnMount: false,
    showErrorToast: false,
  });

  const { makeApiCall: verifyLogin, loading: verifyingOtp } = useApiRequest<AuthResponseType>({
    endpointConfig: LOGIN_ENDPOINT,
    hitApiOnMount: false,
    showErrorToast: false,
  });

  const loading = sendingOtp || verifyingOtp;

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCountryChange = (nextCountry: SupportedCountry) => {
    setCountry(nextCountry);
    if (errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
    }
  };

  const completeAuthorization = async (data: AuthResponseType) => {
    store.dispatch(addUserCredential(data));
    await persistor.flush();
    successToast("Logged in successfully");

    const redirect = getSafeRedirectPath(searchParams.get(REDIRECT_QUERY_PARAM));

    navigate(redirect ?? PROTECTED_ROUTES_PATHS.MY_CONSENTS.path, { replace: true });
  };

  const requestOtp = async () => {
    const phoneNumberError = validatePhoneNumber(formData.phoneNumber, country);
    if (phoneNumberError) {
      setErrors({ phoneNumber: phoneNumberError });
      return;
    }

    const phoneNumber = formatPhoneNumberForApi(formData.phoneNumber, country);

    try {
      await sendOtp({
        payload: { phoneNumber },
      });
      setStep("otp");
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
      setErrors({});
    } catch (error) {
      errorToast(error);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestOtp();
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || loading) {
      return;
    }

    setFormData((prev) => ({ ...prev, otp: "" }));
    setErrors({});
    await requestOtp();
  };

  const handleChangeNumber = () => {
    setStep("mobile");
    setResendCooldown(0);
    setFormData((prev) => ({ ...prev, otp: "" }));
    setErrors({});
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpError = validateOtp(formData.otp);
    if (otpError) {
      setErrors({ otp: otpError });
      return;
    }

    const phoneNumber = formatPhoneNumberForApi(formData.phoneNumber, country);

    try {
      const response = await verifyLogin({
        payload: {
          phoneNumber,
          otp: formData.otp,
        },
      });

      if (!response?.data?.accessToken || !response?.data?.cvUserId) {
        errorToast("Invalid login response. Please try again.");
        return;
      }

      await completeAuthorization(response.data);
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <Login
      step={step}
      formData={formData}
      country={country}
      errors={errors}
      loading={loading}
      resendCooldown={resendCooldown}
      onChange={handleChange}
      onCountryChange={handleCountryChange}
      onSendOtp={handleSendOtp}
      onVerifyOtp={handleVerifyOtp}
      onResendOtp={handleResendOtp}
      onChangeNumber={handleChangeNumber}
    />
  );
};

export default LoginContainer;
