import { AuthFormCard } from "@/components/shared/auth";
import LoginMobileStep from "./LoginMobileStep";
import LoginOtpStep from "./LoginOtpStep";

export type LoginStep = "mobile" | "otp";

type LoginFormData = {
  mobile: string;
  otp: string;
};

type LoginProps = {
  step: LoginStep;
  formData: LoginFormData;
  errors: Partial<Record<keyof LoginFormData, string>>;
  loading: boolean;
  onChange: (field: keyof LoginFormData, value: string) => void;
  onSendOtp: (e: React.FormEvent) => void;
  onVerifyOtp: (e: React.FormEvent) => void;
  onResendOtp: () => void;
  onChangeNumber: () => void;
};

const Login = ({
  step,
  formData,
  errors,
  loading,
  onChange,
  onSendOtp,
  onVerifyOtp,
  onResendOtp,
  onChangeNumber,
}: LoginProps) => (
  <AuthFormCard
    title={step === "mobile" ? "Enter your mobile number" : "Verify OTP"}
    description={
      step === "mobile"
        ? "We'll send a one-time password to verify your number."
        : "Enter the code sent to your mobile number to continue."
    }
  >
    {step === "mobile" ? (
      <LoginMobileStep
        mobile={formData.mobile}
        error={errors.mobile}
        loading={loading}
        onMobileChange={(value) => onChange("mobile", value)}
        onSubmit={onSendOtp}
      />
    ) : (
      <LoginOtpStep
        mobile={formData.mobile}
        otp={formData.otp}
        error={errors.otp}
        loading={loading}
        onOtpChange={(value) => onChange("otp", value)}
        onSubmit={onVerifyOtp}
        onResendOtp={onResendOtp}
        onChangeNumber={onChangeNumber}
      />
    )}
  </AuthFormCard>
);

export default Login;
