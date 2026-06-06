import { MY_CONSENTS_ENDPOINT, REVOKE_CONSENT_ENDPOINT } from "@/configs/endpoints";
import { useApiRequest } from "@/hooks";
import { DashboardDataType, RevokeConsentDataType } from "@/types";
import { successToast } from "@/utils";
import { MyConsents } from "../components";

const MyConsentsContainer = () => {
  const { data, loading, refetch } = useApiRequest<DashboardDataType>({
    endpointConfig: MY_CONSENTS_ENDPOINT,
    hitApiOnMount: true,
    showErrorToast: false,
  });

  const { makeApiCall: revokeConsent, loading: revoking } =
    useApiRequest<RevokeConsentDataType>({
      endpointConfig: REVOKE_CONSENT_ENDPOINT,
      hitApiOnMount: false,
      showErrorToast: true,
    });

  const handleRevokeConsent = async (consentId: string) => {
    await revokeConsent({ pathParams: [consentId] });
    successToast("Consent revoked successfully.");
    await refetch();
  };

  const dashboard = data?.data;

  return (
    <MyConsents
      loading={loading}
      revoking={revoking}
      totalActive={dashboard?.totalActive ?? 0}
      totalRevoked={dashboard?.totalRevoked ?? 0}
      totalExpired={dashboard?.totalExpired ?? 0}
      consentsByClient={dashboard?.consentsByClient ?? {}}
      onRevokeConsent={handleRevokeConsent}
    />
  );
};

export default MyConsentsContainer;
