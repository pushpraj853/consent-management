import { AuthFormCard } from "@/components/shared/auth";
import {
  COUNTRY_CONFIG,
  DEFAULT_COUNTRY,
  maskPhoneNumber,
} from "@/components/shared/phone-number";
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
  resendCooldown: number;
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
  resendCooldown,
  onChange,
  onSendOtp,
  onVerifyOtp,
  onResendOtp,
  onChangeNumber,
}: LoginProps) => (
  <AuthFormCard
    title={step === "mobile" ? "Enter your mobile number" : "Verify OTP"}
    description={
      step === "mobile" ? (
        "We'll send a one-time password to verify your number."
      ) : (
        <span>
          Enter the code sent to{" "}
          <span className="font-medium text-foreground tabular-nums">
            {COUNTRY_CONFIG[DEFAULT_COUNTRY].dialCode} {maskPhoneNumber(formData.mobile)}
          </span>{" "}
          to continue.
        </span>
      )
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
        otp={formData.otp}
        error={errors.otp}
        loading={loading}
        resendCooldown={resendCooldown}
        onOtpChange={(value) => onChange("otp", value)}
        onSubmit={onVerifyOtp}
        onResendOtp={onResendOtp}
        onChangeNumber={onChangeNumber}
      />
    )}
  </AuthFormCard>
);

export default Login;
