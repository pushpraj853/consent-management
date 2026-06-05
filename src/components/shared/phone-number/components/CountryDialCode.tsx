import { cn } from "@/lib/utils";
import {
  COUNTRY_CONFIG,
  DEFAULT_COUNTRY,
  SupportedCountry,
} from "../phone-number.utils";

type CountryDialCodeProps = {
  country?: SupportedCountry;
  className?: string;
};

const CountryDialCode = ({
  country = DEFAULT_COUNTRY,
  className,
}: CountryDialCodeProps) => {
  const { dialCode, iso } = COUNTRY_CONFIG[country];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap text-sm leading-none",
        className,
      )}
    >
      <span className="font-semibold text-foreground tabular-nums">{dialCode}</span>
      <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
        {iso}
      </span>
    </span>
  );
};

export default CountryDialCode;
