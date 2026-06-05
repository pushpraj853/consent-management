import { useState } from "react";
import { FORGOT_PASSWORD_ENDPOINT } from "@/configs/endpoints";
import { useApiRequest } from "@/hooks";
import { ForgotPasswordResponseType } from "@/types";
import { errorToast } from "@/utils";
import ForgotPassword from "../components/ForgotPassword";

const ForgotPasswordContainer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { makeApiCall: requestReset, loading } = useApiRequest<ForgotPasswordResponseType>({
    endpointConfig: FORGOT_PASSWORD_ENDPOINT,
    hitApiOnMount: false,
    showErrorToast: false,
  });

  const handleChange = (value: string) => {
    setEmail(value);
    if (error) setError(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await requestReset({ payload: { email } });
      setSuccessMessage(response.data.message);
      setSubmitted(true);
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <ForgotPassword
      email={email}
      error={error}
      loading={loading}
      submitted={submitted}
      successMessage={successMessage}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default ForgotPasswordContainer;
