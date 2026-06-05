import { Loader2 } from "lucide-react";
import { OtpInput } from "@/components/shared/auth";
import { PhoneNumberBadge } from "@/components/shared/phone-number";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type LoginOtpStepProps = {
  mobile: string;
  otp: string;
  error?: string;
  loading: boolean;
  onOtpChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResendOtp: () => void;
  onChangeNumber: () => void;
};

const LoginOtpStep = ({
  mobile,
  otp,
  error,
  loading,
  onOtpChange,
  onSubmit,
  onResendOtp,
  onChangeNumber,
}: LoginOtpStepProps) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="otp">Enter OTP</Label>
        <button
          type="button"
          onClick={onChangeNumber}
          className="text-xs text-muted-foreground hover:text-primary hover:underline"
        >
          Change number
        </button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-muted-foreground">OTP sent to</p>
        <PhoneNumberBadge mobile={mobile} />
      </div>
      <OtpInput
        id="otp"
        value={otp}
        onChange={onOtpChange}
        disabled={loading}
        autoFocus
        aria-invalid={!!error}
        aria-describedby={error ? "otp-error" : undefined}
      />
      {error && (
        <p id="otp-error" className="text-center text-xs text-destructive">
          {error}
        </p>
      )}
    </div>

    <Button type="submit" className="w-full" size="lg" disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="animate-spin" />
          Verifying...
        </>
      ) : (
        "Continue"
      )}
    </Button>

    <Button
      type="button"
      variant="ghost"
      className="w-full"
      size="sm"
      disabled={loading}
      onClick={onResendOtp}
    >
      Resend OTP
    </Button>
  </form>
);

export default LoginOtpStep;
