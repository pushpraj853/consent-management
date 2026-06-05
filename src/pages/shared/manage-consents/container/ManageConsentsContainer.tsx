import { useParams } from "react-router-dom";
import { MANAGE_CONSENTS_ENDPOINT, REVOKE_CONSENT_ENDPOINT } from "@/configs/endpoints";
import { useApiRequest } from "@/hooks";
import { ManageConsentsDataType, RevokeConsentDataType } from "@/types";
import { ManageConsents } from "../components";

const ManageConsentsContainer = () => {
  const { token } = useParams<{ token: string }>();

  useApiRequest<ManageConsentsDataType>({
    endpointConfig: MANAGE_CONSENTS_ENDPOINT,
    hitApiOnMount: Boolean(token),
    pathParams: token ? [token] : [],
    dependencies: [token],
    showErrorToast: false,
  });

  const { makeApiCall: revokeConsent } = useApiRequest<RevokeConsentDataType>({
    endpointConfig: REVOKE_CONSENT_ENDPOINT,
    hitApiOnMount: false,
    showErrorToast: false,
  });

  const handleRevokeConsent = (consentId: string) => {
    if (!token) {
      return;
    }

    revokeConsent({ pathParams: [token, "consents", consentId] });
  };

  return <ManageConsents onRevokeConsent={handleRevokeConsent} />;
};

export default ManageConsentsContainer;
