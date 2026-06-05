export const COUNTRY_CONFIG = {
  IN: {
    dialCode: "+91",
    iso: "IN",
    name: "India",
    phoneLength: 10,
  },
  US: {
    dialCode: "+1",
    iso: "US",
    name: "United States",
    phoneLength: 10,
  },
  GB: {
    dialCode: "+44",
    iso: "GB",
    name: "United Kingdom",
    phoneLength: 10,
  },
  AU: {
    dialCode: "+61",
    iso: "AU",
    name: "Australia",
    phoneLength: 9,
  },
  CA: {
    dialCode: "+1",
    iso: "CA",
    name: "Canada",
    phoneLength: 10,
  },
  DE: {
    dialCode: "+49",
    iso: "DE",
    name: "Germany",
    phoneLength: 11,
  },
  FR: {
    dialCode: "+33",
    iso: "FR",
    name: "France",
    phoneLength: 9,
  },
  AE: {
    dialCode: "+971",
    iso: "AE",
    name: "United Arab Emirates",
    phoneLength: 9,
  },
  SG: {
    dialCode: "+65",
    iso: "SG",
    name: "Singapore",
    phoneLength: 8,
  },
  JP: {
    dialCode: "+81",
    iso: "JP",
    name: "Japan",
    phoneLength: 10,
  },
  BR: {
    dialCode: "+55",
    iso: "BR",
    name: "Brazil",
    phoneLength: 11,
  },
} as const;

export type SupportedCountry = keyof typeof COUNTRY_CONFIG;
export const SUPPORTED_COUNTRIES = Object.keys(COUNTRY_CONFIG) as SupportedCountry[];

export const DEFAULT_COUNTRY: SupportedCountry = "IN";
export const DEFAULT_COUNTRY_DIAL_CODE = COUNTRY_CONFIG[DEFAULT_COUNTRY].dialCode;
export const DEFAULT_COUNTRY_ISO = COUNTRY_CONFIG[DEFAULT_COUNTRY].iso;
export const DEFAULT_PHONE_LENGTH = COUNTRY_CONFIG[DEFAULT_COUNTRY].phoneLength;

export const getCountryOptions = () =>
  SUPPORTED_COUNTRIES.map((code) => {
    const { dialCode, iso, name } = COUNTRY_CONFIG[code];

    return {
      value: code,
      label: `${dialCode} ${iso}`,
      description: name,
      keywords: `${name} ${iso} ${dialCode}`,
    };
  });

export const maskPhoneNumber = (mobile: string) => {
  if (mobile.length < 4) return mobile;
  return `${mobile.slice(0, 2)}XXXXXX${mobile.slice(-2)}`;
};

export const sanitizePhoneDigits = (value: string) => value.replace(/\D/g, "");
