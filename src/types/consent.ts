export type ConsentDecision = "GRANTED" | "DENIED";
export type ConsentStatus = "ACTIVE" | "REVOKED" | "EXPIRED";

export interface ConsentItemType {
  consentId: string;
  purposeName: string;
  description: string;
  decision: ConsentDecision | string;
  status: ConsentStatus | string;
  submittedAt: string;
  expiresAt: string;
}

export interface ManageConsentsDataType {
  cvUserId: string;
  clientName: string;
  clientLogo: string;
  consents: ConsentItemType[];
}

export interface RevokeConsentDataType {
  consentId: string;
  status: ConsentStatus | string;
  revokedAt: string;
}

export type AuditEventKind =
  | "CONSENT_GIVEN"
  | "CONSENT_REVOKED"
  | "CONSENT_EXPIRED"
  | string;

export interface AuditEventMetadataType {
  purpose?: string;
  channel?: string;
  ip?: string;
  [key: string]: unknown;
}

export interface AuditEventType {
  auditId: string;
  eventType: AuditEventKind;
  cvUserId: string;
  clientId: string;
  consentId: string;
  actorType: string;
  actorId: string;
  metadata: AuditEventMetadataType;
  createdAt: string;
}

export interface AuditTrailPageType {
  content: AuditEventType[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
