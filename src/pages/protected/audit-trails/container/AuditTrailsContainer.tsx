import { useSearchParams } from "react-router-dom";
import { AUDIT_TRAIL_ENDPOINT } from "@/configs/endpoints";
import { useApiRequest } from "@/hooks";
import { AuditTrailPageType } from "@/types";
import { AuditTrails } from "../components";

const AuditTrailsContainer = () => {
  const [searchParams] = useSearchParams();
  const cvUserId = searchParams.get("cv_user_id");

  const queryParams: Record<string, unknown> = {
    page: 0,
    size: 20,
  };

  if (cvUserId) {
    queryParams.cv_user_id = cvUserId;
  }

  useApiRequest<AuditTrailPageType>({
    endpointConfig: AUDIT_TRAIL_ENDPOINT,
    hitApiOnMount: true,
    queryParams,
    dependencies: [cvUserId],
    showErrorToast: false,
  });

  return <AuditTrails />;
};

export default AuditTrailsContainer;
