import { AUDIT_TRAIL_ENDPOINT } from "@/configs/endpoints";
import { useApiRequest } from "@/hooks";
import { AuditTrailPageType } from "@/types";
import { AuditTrails } from "../components";

const AuditTrailsContainer = () => {
  useApiRequest<AuditTrailPageType>({
    endpointConfig: AUDIT_TRAIL_ENDPOINT,
    hitApiOnMount: true,
    queryParams: {
      page: 0,
      size: 20,
    },
    showErrorToast: false,
  });

  return <AuditTrails />;
};

export default AuditTrailsContainer;
