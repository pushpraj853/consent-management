import { ApiResponse } from "../types";
import { BASE_URL } from "../configs";
import { makeDeleteRequest, makeGetRequest } from "../services/http-services";
import {
  AUDIT_TRAIL_ENDPOINT,
  MANAGE_CONSENTS_ENDPOINT,
  REVOKE_CONSENT_ENDPOINT,
} from "../configs/endpoints";
import {
  AuditTrailPageType,
  ManageConsentsDataType,
  RevokeConsentDataType,
} from "../types/consent";

export const getManageConsents = async (
  token: string,
): Promise<ApiResponse<ManageConsentsDataType>> => {
  const { endpoint, attachToken, attachXUserId } = MANAGE_CONSENTS_ENDPOINT;

  return makeGetRequest<ManageConsentsDataType>({
    url: `${BASE_URL}${endpoint}/${token}`,
    attachToken,
    attachXUserId,
  });
};

export const revokeConsent = async (
  token: string,
  consentId: string,
): Promise<ApiResponse<RevokeConsentDataType>> => {
  const { endpoint, attachToken, attachXUserId } = REVOKE_CONSENT_ENDPOINT;

  return makeDeleteRequest<RevokeConsentDataType>({
    url: `${BASE_URL}${endpoint}/${token}/consents/${consentId}`,
    attachToken,
    attachXUserId,
  });
};

export const getAuditTrail = async (
  queryParams: Record<string, unknown>,
): Promise<ApiResponse<AuditTrailPageType>> => {
  const { endpoint, attachToken, attachXUserId } = AUDIT_TRAIL_ENDPOINT;

  return makeGetRequest<AuditTrailPageType>({
    url: `${BASE_URL}${endpoint}`,
    attachToken,
    attachXUserId,
    params: queryParams,
  });
};
