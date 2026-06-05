import appIcon from "@/assets/icons/app-icon.webp";
import { APP_NAME } from "@/configs/envoirmentVars";
import { cn } from "@/lib/utils";

type AuthFormCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

const AuthFormCard = ({
  title,
  description,
  children,
  footer,
  className,
}: AuthFormCardProps) => (
  <div className={cn("w-full max-w-md", className)}>
    <div className="mb-8 flex flex-col items-center gap-3 lg:hidden">
      <img
        src={appIcon}
        alt={`${APP_NAME ?? "Consent"} icon`}
        className="size-14 rounded-2xl shadow-md ring-1 ring-primary/20"
      />
      <span className="text-sm font-medium text-muted-foreground">
        {APP_NAME ?? "Consent Vault"}
      </span>
    </div>

    <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-xl shadow-brand/5 ring-1 ring-foreground/5">
      <div className="mb-6 space-y-1.5">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {children}

      {footer && (
        <div className="mt-6 border-t border-border/60 pt-5 text-center text-sm text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  </div>
);

export default AuthFormCard;
