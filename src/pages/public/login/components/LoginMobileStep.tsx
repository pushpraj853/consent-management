import { Loader2 } from "lucide-react";
import {
  PhoneNumberInput,
  SupportedCountry,
} from "@/components/shared/phone-number";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type LoginMobileStepProps = {
  phoneNumber: string;
  country: SupportedCountry;
  error?: string;
  loading: boolean;
  onPhoneNumberChange: (value: string) => void;
  onCountryChange: (country: SupportedCountry) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const LoginMobileStep = ({
  phoneNumber,
  country,
  error,
  loading,
  onPhoneNumberChange,
  onCountryChange,
  onSubmit,
}: LoginMobileStepProps) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="phoneNumber">Mobile number</Label>
      <PhoneNumberInput
        id="phoneNumber"
        value={phoneNumber}
        country={country}
        countryMode="dropdown"
        onCountryChange={onCountryChange}
        onChange={onPhoneNumberChange}
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
