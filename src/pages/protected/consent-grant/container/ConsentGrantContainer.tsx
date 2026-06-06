import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CLIENT_DISPLAY_ENDPOINT } from "@/configs/endpoints";
import { useApiRequest } from "@/hooks";
import { PROTECTED_ROUTES_PATHS } from "@/routes";
import { ClientDisplayDataType, ConsentGrantStatus } from "@/types/consent-grant";
import {
  completeConsentGrantFlow,
  getConsentGrantUrlContext,
  mapClientDisplayToConsentGrant,
} from "../consent-grant.utils";
import {
  ConsentGrant,
  ConsentGrantInvalid,
  ConsentGrantRedirecting,
  ConsentGrantSkeleton,
} from "../components";

const ConsentGrantContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const { clientToken, state, redirectUri, hasValidUrlParams } =
    getConsentGrantUrlContext(searchParams);

  const { data, loading: fetchingClient, error } = useApiRequest<ClientDisplayDataType>({
    endpointConfig: CLIENT_DISPLAY_ENDPOINT,
    hitApiOnMount: hasValidUrlParams,
    payload: { clientToken: clientToken ?? "" },
    dependencies: [clientToken],
    showErrorToast: false,
  });

  const client = useMemo(() => {
    if (!data?.data) {
      return null;
    }

    return mapClientDisplayToConsentGrant(data.data);
  }, [data]);

  const handleFallbackNavigation = () => {
    navigate(PROTECTED_ROUTES_PATHS.MY_CONSENTS.path, { replace: true });
  };

  const finishConsentFlow = (status: ConsentGrantStatus) => {
    if (!redirectUri) {
      handleFallbackNavigation();
      return;
    }

    setRedirecting(true);

    completeConsentGrantFlow({
      redirectUri,
      payload: {
        status,
        state,
        clientToken,
      },
      onFallback: handleFallbackNavigation,
    });
  };

  const handleAllow = async () => {
    if (!client) {
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 400));
      finishConsentFlow("granted");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeny = () => {
    finishConsentFlow("denied");
  };

  const handleInvalidAction = () => {
    if (redirectUri) {
      finishConsentFlow("error");
      return;
    }

    handleFallbackNavigation();
  };

  if (redirecting && client) {
    return <ConsentGrantRedirecting companyName={client.companyName} />;
  }

  if (!hasValidUrlParams) {
    return (
      <ConsentGrantInvalid
        actionLabel={redirectUri ? "Return to application" : "Go to My Consents"}
        onAction={handleInvalidAction}
      />
    );
  }

  if (fetchingClient) {
    return <ConsentGrantSkeleton />;
  }

  if (error || !client) {
    return (
      <ConsentGrantInvalid
        actionLabel={redirectUri ? "Return to application" : "Go to My Consents"}
        onAction={handleInvalidAction}
      />
    );
  }

  return (
    <ConsentGrant
      client={client}
      loading={submitting}
      onAllow={handleAllow}
      onDeny={handleDeny}
    />
  );
};

export default ConsentGrantContainer;
