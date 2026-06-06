export type ConsentGrantStatus = "granted" | "denied" | "error";

export interface ClientDisplayDataType {
  logoUrl: string;
  appDisplayLabel: string;
}

export interface ConsentGrantClientType {
  companyLogoUrl: string;
  companyName: string;
  description: string;
  dataKeys: string[];
  consentDuration: number;
}

export interface ConsentGrantCallbackPayload {
  status: ConsentGrantStatus;
  state: string | null;
  clientToken: string | null;
}

export interface SubmitConsentPayloadType {
  clientToken: string;
  purposeString: string;
  grantedDataItems: string[];
  durationDays: number;
  userChangedDuration: boolean;
  consentGranted: boolean;
}

export interface SubmitConsentDataType {
  consentId: string;
  decision: string;
  status: string;
}
