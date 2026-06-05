import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN_ENDPOINT, SEND_OTP_ENDPOINT } from "@/configs/endpoints";
import { useApiRequest } from "@/hooks";
import { PROTECTED_ROUTES_PATHS } from "@/routes";
import { addUserCredential } from "@/store/slices";
import { AuthResponseType, SendOtpResponseType } from "@/types";
import { errorToast } from "@/utils";
import Login, { LoginStep } from "../components/Login";

type LoginFormData = {
  mobile: string;
  otp: string;
};

const MOBILE_REGEX = /^[6-9]\d{9}$/;
const OTP_REGEX = /^\d{6}$/;
const RESEND_COOLDOWN_SECONDS = 30;

const validateMobile = (mobile: string): string | undefined => {
  if (!mobile.trim()) {
    return "Mobile number is required.";
  }
  if (!MOBILE_REGEX.test(mobile)) {
    return "Please enter a valid 10-digit mobile number.";
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
  const dispatch = useDispatch();
  const [step, setStep] = useState<LoginStep>("mobile");
  const [formData, setFormData] = useState<LoginFormData>({ mobile: "", otp: "" });
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

  const completeAuthorization = (data: AuthResponseType) => {
    dispatch(
      addUserCredential({
        token: data.accessToken,
        user: {
          id: data.id,
          email: data.email,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      }),
    );
    navigate(PROTECTED_ROUTES_PATHS.DASHBOARD.path, { replace: true });
  };

  const requestOtp = async () => {
    const mobileError = validateMobile(formData.mobile);
    if (mobileError) {
      setErrors({ mobile: mobileError });
      return;
    }

    try {
      await sendOtp({ payload: { mobile: formData.mobile } });
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

    try {
      const response = await verifyLogin({
        payload: { mobile: formData.mobile, otp: formData.otp },
      });
      completeAuthorization(response.data);
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <Login
      step={step}
      formData={formData}
      errors={errors}
      loading={loading}
      resendCooldown={resendCooldown}
      onChange={handleChange}
      onSendOtp={handleSendOtp}
      onVerifyOtp={handleVerifyOtp}
      onResendOtp={handleResendOtp}
      onChangeNumber={handleChangeNumber}
    />
  );
};

export default LoginContainer;
