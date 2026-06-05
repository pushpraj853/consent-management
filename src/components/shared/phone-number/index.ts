export { CountryDialCode, CountrySelector, PhoneNumberBadge } from "./components";
export type { CountrySelectorMode } from "./components";
export { PhoneNumberInputContainer } from "./container";
export { default as PhoneNumberInput } from "./container/PhoneNumberInputContainer";
export {
  COUNTRY_CONFIG,
  DEFAULT_COUNTRY,
  DEFAULT_COUNTRY_DIAL_CODE,
  DEFAULT_COUNTRY_ISO,
  DEFAULT_PHONE_LENGTH,
  getCountryOptions,
  maskPhoneNumber,
  sanitizePhoneDigits,
  SUPPORTED_COUNTRIES,
} from "./phone-number.utils";
export type { SupportedCountry } from "./phone-number.utils";
