import { Loader2 } from "lucide-react";
import { OtpInput } from "@/components/shared/auth";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type LoginOtpStepProps = {
  otp: string;
  error?: string;
  loading: boolean;
  resendCooldown: number;
  onOtpChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResendOtp: () => void;
  onChangeNumber: () => void;
};

const LoginOtpStep = ({
  otp,
  error,
  loading,
  resendCooldown,
  onOtpChange,
  onSubmit,
  onResendOtp,
  onChangeNumber,
}: LoginOtpStepProps) => {
  const canResend = resendCooldown === 0 && !loading;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="otp">Enter OTP</Label>
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
          <p id="otp-error" className="text-xs text-destructive">
            {error}
          </p>
        )}
      </div>

      <div className="space-y-4">
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

        <div className="space-y-2 text-center text-sm text-muted-foreground">
          <p>
            <span>Didn&apos;t receive the code?</span>{" "}
            {canResend ? (
              <button
                type="button"
                onClick={onResendOtp}
                className="font-medium text-primary hover:underline"
              >
                Resend OTP
              </button>
            ) : (
              <span>
                Resend in{" "}
                <span className="font-medium tabular-nums text-foreground">
                  {resendCooldown}s
                </span>
              </span>
            )}
          </p>
          <p>
            <span>Not your number?</span>{" "}
            <button
              type="button"
              onClick={onChangeNumber}
              disabled={loading}
              className="font-medium text-primary enabled:hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              Change number
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginOtpStep;
