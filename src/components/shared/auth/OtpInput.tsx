import { useCallback, useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_LENGTH = 6;

const sanitizeOtp = (input: string, maxLength: number) =>
  input.replace(/\D/g, "").slice(0, maxLength);

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  id?: string;
  onComplete?: (value: string) => void;
  className?: string;
};

const OtpInput = ({
  value,
  onChange,
  length = DEFAULT_LENGTH,
  disabled = false,
  autoFocus = false,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  id,
  onComplete,
  className,
}: OtpInputProps) => {
  const generatedId = useId();
  const groupId = id ?? generatedId;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const autofillRef = useRef<HTMLInputElement>(null);

  const digits = Array.from({ length }, (_, index) => value[index] ?? "");

  const focusInput = useCallback((index: number) => {
    const input = inputRefs.current[index];
    if (!input) return;
    input.focus();
    input.select();
  }, []);

  const applyOtp = useCallback(
    (raw: string) => {
      const sanitized = sanitizeOtp(raw, length);
      onChange(sanitized);

      requestAnimationFrame(() => {
        const focusIndex = sanitized.length < length ? sanitized.length : length - 1;
        focusInput(focusIndex);
      });

      if (sanitized.length === length) {
        onComplete?.(sanitized);
      }
    },
    [focusInput, length, onChange, onComplete],
  );

  const updateDigit = (index: number, digit: string) => {
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    const nextValue = nextDigits.join("").slice(0, length);
    onChange(nextValue);

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }

    if (nextValue.length === length) {
      onComplete?.(nextValue);
    }
  };

  const handleDigitChange = (index: number, raw: string) => {
    const digitOnly = raw.replace(/\D/g, "");

    if (digitOnly.length > 1) {
      applyOtp(digitOnly);
      return;
    }

    updateDigit(index, digitOnly);
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      updateDigit(index, event.key);
      return;
    }

    if (event.key === "Backspace") {
      event.preventDefault();

      if (digits[index]) {
        const nextDigits = [...digits];
        nextDigits[index] = "";
        onChange(nextDigits.join(""));
        return;
      }

      if (index > 0) {
        const nextDigits = [...digits];
        nextDigits[index - 1] = "";
        onChange(nextDigits.join(""));
        focusInput(index - 1);
      }
      return;
    }

    if (event.key === "Delete") {
      event.preventDefault();
      if (!digits[index]) return;

      const nextDigits = [...digits];
      nextDigits[index] = "";
      onChange(nextDigits.join(""));
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
      return;
    }

    if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    applyOtp(event.clipboardData.getData("text"));
  };

  useEffect(() => {
    if (autoFocus && !disabled) {
      requestAnimationFrame(() => focusInput(0));
    }
  }, [autoFocus, disabled, focusInput]);

  return (
    <div className={cn("relative", className)}>
      <input
        ref={autofillRef}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute size-0 opacity-0"
        value={value}
        onChange={(event) => applyOtp(event.target.value)}
        disabled={disabled}
      />

      <div
        id={groupId}
        role="group"
        aria-label="One-time password"
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className="flex justify-between gap-2 sm:gap-3"
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            enterKeyHint={index === length - 1 ? "done" : "next"}
            maxLength={1}
            value={digit}
            disabled={disabled}
            aria-invalid={ariaInvalid}
            aria-label={`Digit ${index + 1} of ${length}`}
            className={cn(
              "size-11 flex-1 rounded-lg border border-input bg-transparent text-center text-lg font-semibold tabular-nums transition-colors outline-none sm:size-12",
              "focus-visible:ring-3 focus-visible:ring-ring/50",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
              "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
              "dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
            )}
            onChange={(event) => handleDigitChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            onFocus={(event) => event.target.select()}
          />
        ))}
      </div>
    </div>
  );
};

export default OtpInput;
