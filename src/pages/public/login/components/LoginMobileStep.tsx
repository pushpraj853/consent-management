import { Loader2 } from "lucide-react";
import { PhoneNumberInput } from "@/components/shared/phone-number";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type LoginMobileStepProps = {
  mobile: string;
  error?: string;
  loading: boolean;
  onMobileChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const LoginMobileStep = ({
  mobile,
  error,
  loading,
  onMobileChange,
  onSubmit,
}: LoginMobileStepProps) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="mobile">Mobile number</Label>
      <PhoneNumberInput
        id="mobile"
        value={mobile}
        onChange={onMobileChange}
        disabled={loading}
        autoFocus
        aria-invalid={!!error}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>

    <Button type="submit" className="w-full" size="lg" disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="animate-spin" />
          Sending OTP...
        </>
      ) : (
        "Send OTP"
      )}
    </Button>
  </form>
);

export default LoginMobileStep;
