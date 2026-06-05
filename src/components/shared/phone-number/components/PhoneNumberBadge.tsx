import { cn } from "@/lib/utils";
import {
  COUNTRY_CONFIG,
  DEFAULT_COUNTRY,
  maskPhoneNumber,
  SupportedCountry,
} from "../phone-number.utils";

type PhoneNumberBadgeProps = {
  mobile: string;
  masked?: boolean;
  country?: SupportedCountry;
  className?: string;
};

const PhoneNumberBadge = ({
  mobile,
  masked = true,
  country = DEFAULT_COUNTRY,
  className,
}: PhoneNumberBadgeProps) => {
  const { dialCode } = COUNTRY_CONFIG[country];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground tabular-nums",
        className,
      )}
    >
      {dialCode} {masked ? maskPhoneNumber(mobile) : mobile}
    </span>
  );
};

export default PhoneNumberBadge;
