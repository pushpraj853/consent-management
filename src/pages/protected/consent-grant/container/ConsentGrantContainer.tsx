import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CLIENT_DISPLAY_ENDPOINT, SUBMIT_CONSENT_ENDPOINT } from "@/configs/endpoints";
import { useApiRequest } from "@/hooks";
import { PROTECTED_ROUTES_PATHS } from "@/routes";
import {
  ClientDisplayDataType,
  ConsentGrantStatus,
  SubmitConsentDataType,
} from "@/types/consent-grant";
import {
  buildSubmitConsentPayload,
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

  const { makeApiCall: submitConsent } = useApiRequest<SubmitConsentDataType>({
    endpointConfig: SUBMIT_CONSENT_ENDPOINT,
    hitApiOnMount: false,
    showErrorToast: true,
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

  const submitConsentDecision = async (consentGranted: boolean) => {
    if (!client || !clientToken) {
      return;
    }

    setSubmitting(true);

    try {
      await submitConsent({
        payload: buildSubmitConsentPayload({
          clientToken,
          dataKeys: client.dataKeys,
          consentDuration: client.consentDuration,
          consentGranted,
        }),
      });

      finishConsentFlow(consentGranted ? "granted" : "denied");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAllow = () => submitConsentDecision(true);

  const handleDeny = () => submitConsentDecision(false);

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
