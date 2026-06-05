import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import { AuthFormCard } from "@/components/shared/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PUBLIC_ROUTES_PATHS } from "@/routes";

type ForgotPasswordProps = {
  email: string;
  error?: string;
  loading: boolean;
  submitted: boolean;
  successMessage?: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const ForgotPassword = ({
  email,
  error,
  loading,
  submitted,
  successMessage,
  onChange,
  onSubmit,
}: ForgotPasswordProps) => {
  if (submitted) {
    return (
      <AuthFormCard
        title="Check your inbox"
        description="We've sent password reset instructions if an account exists."
        footer={
          <Link
            to={PUBLIC_ROUTES_PATHS.LOGIN.path}
            className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
          >
            <ArrowLeft className="size-3.5" />
            Back to sign in
          </Link>
        }
      >
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="size-7" />
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {successMessage}
          </p>
        </div>
      </AuthFormCard>
    );
  }

  return (
    <AuthFormCard
      title="Reset your password"
      description="Enter the email associated with your account and we'll send a reset link."
      footer={
        <Link
          to={PUBLIC_ROUTES_PATHS.LOGIN.path}
          className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              className="pl-9"
              value={email}
              onChange={(e) => onChange(e.target.value)}
              aria-invalid={!!error}
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Sending reset link...
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>
    </AuthFormCard>
  );
};

export default ForgotPassword;
