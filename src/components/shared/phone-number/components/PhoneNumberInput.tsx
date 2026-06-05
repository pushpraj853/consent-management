import { inputGroupFieldClass, inputGroupVariants } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { COUNTRY_CONFIG, DEFAULT_COUNTRY, SupportedCountry } from "../phone-number.utils";
import CountrySelector, { CountrySelectorMode } from "./CountrySelector";

type PhoneNumberInputProps = Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
  country?: SupportedCountry;
  countryMode?: CountrySelectorMode;
  onCountryChange?: (country: SupportedCountry) => void;
  className?: string;
  inputClassName?: string;
};

const PhoneNumberInput = ({
  value,
  onChange,
  country = DEFAULT_COUNTRY,
  countryMode = "fixed",
  onCountryChange,
  disabled,
  className,
  inputClassName,
  id,
  placeholder = "9876543210",
  maxLength = COUNTRY_CONFIG[country].phoneLength,
  "aria-invalid": ariaInvalid,
  ...props
}: PhoneNumberInputProps) => (
  <div data-slot="input-group" className={cn(inputGroupVariants({ size: "lg" }), className)}>
    <div
      className={cn(
        "flex h-full shrink-0 items-center border-r border-input px-3",
        countryMode === "dropdown" ? "min-w-[5.25rem]" : "min-w-[4.75rem]",
      )}
      aria-hidden={countryMode === "fixed" ? true : undefined}
    >
      <CountrySelector
        mode={countryMode}
        country={country}
        onCountryChange={onCountryChange}
        disabled={disabled}
      />
    </div>

    <input
      id={id}
      type="tel"
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="tel-national"
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      aria-invalid={ariaInvalid}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={cn(
        inputGroupFieldClass,
        "font-medium tabular-nums placeholder:font-normal",
        inputClassName,
      )}
      {...props}
    />
  </div>
);

export default PhoneNumberInput;
