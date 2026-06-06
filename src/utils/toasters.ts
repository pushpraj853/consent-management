import toast from "react-hot-toast";
type ToastTypes = "success" | "error" | "loading" | "custom";
type ShowToastFn = { message?: string; type?: ToastTypes; duration?: number };

export const showToast = ({ message = "", type = "error", duration = 4000 }: ShowToastFn) => {
  toast[type](message, { duration });
};

export const successToast = (message: string) => {
  showToast({ message, type: "success" });
};

const isHandledUnauthorizedError = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "isUnauthorized" in error &&
  (error as { isUnauthorized: boolean }).isUnauthorized === true;

export const errorToast = (error: unknown): void => {
  if (isHandledUnauthorizedError(error)) {
    return;
  }

  if (typeof error === "object" && error !== null && ("message" in error || "reason" in error)) {
    const { message, reason } = error as { message?: string; reason?: string };
    showToast({ message: message ?? reason ?? "Something went wrong." });
  } else {
    showToast({ message: "Unknown error occurred" });
  }
};
