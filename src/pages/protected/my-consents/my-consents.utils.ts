import { DashboardConsentItemType } from "@/types";

export type CompanyConsentViewProps = {
  companyName: string;
  consents: DashboardConsentItemType[];
  revoking: boolean;
  onRevokeConsent: (consentId: string) => Promise<void>;
};

export const formatConsentDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const formatConsentCount = (count: number) =>
  `${count} consent${count !== 1 ? "s" : ""}`;
