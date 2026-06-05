import { SearchableSelect } from "@/components/ui/searchable-select";
import {
  COUNTRY_CONFIG,
  DEFAULT_COUNTRY,
  getCountryOptions,
  SupportedCountry,
} from "../phone-number.utils";
import CountryDialCode from "./CountryDialCode";

export type CountrySelectorMode = "fixed" | "dropdown";

type CountrySelectorProps = {
  mode?: CountrySelectorMode;
  country?: SupportedCountry;
  onCountryChange?: (country: SupportedCountry) => void;
  disabled?: boolean;
  className?: string;
};

const countryOptions = getCountryOptions();

const CountrySelector = ({
  mode = "fixed",
  country = DEFAULT_COUNTRY,
  onCountryChange,
  disabled,
  className,
}: CountrySelectorProps) => {
  if (mode === "fixed") {
    return <CountryDialCode country={country} className={className} />;
  }

  const { dialCode, iso } = COUNTRY_CONFIG[country];

  return (
    <SearchableSelect
      embedded
      options={countryOptions}
      value={country}
      onValueChange={(value) => onCountryChange?.(value as SupportedCountry)}
      disabled={disabled}
      searchPlaceholder="Search country or code"
      triggerLabel={`${dialCode} ${iso}`}
      contentClassName="min-w-56"
      className={className}
    />
  );
};

export default CountrySelector;
