import { AuthFormCard } from "@/components/shared/auth";
import {
  COUNTRY_CONFIG,
  maskPhoneNumber,
  SupportedCountry,
} from "@/components/shared/phone-number";
import LoginMobileStep from "./LoginMobileStep";
import LoginOtpStep from "./LoginOtpStep";

export type LoginStep = "mobile" | "otp";

type LoginFormData = {
  phoneNumber: string;
  otp: string;
};

type LoginProps = {
  step: LoginStep;
  formData: LoginFormData;
  country: SupportedCountry;
  errors: Partial<Record<keyof LoginFormData, string>>;
  loading: boolean;
  resendCooldown: number;
  onChange: (field: keyof LoginFormData, value: string) => void;
  onCountryChange: (country: SupportedCountry) => void;
  onSendOtp: (e: React.FormEvent) => void;
  onVerifyOtp: (e: React.FormEvent) => void;
  onResendOtp: () => void;
  onChangeNumber: () => void;
};

const Login = ({
  step,
  formData,
  country,
  errors,
  loading,
  resendCooldown,
  onChange,
  onCountryChange,
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
            {COUNTRY_CONFIG[country].dialCode} {maskPhoneNumber(formData.phoneNumber)}
          </span>{" "}
          to continue.
        </span>
      )
    }
  >
    {step === "mobile" ? (
      <LoginMobileStep
        phoneNumber={formData.phoneNumber}
        country={country}
        error={errors.phoneNumber}
        loading={loading}
        onPhoneNumberChange={(value) => onChange("phoneNumber", value)}
        onCountryChange={onCountryChange}
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
