import appIcon from "@/assets/icons/app-icon.webp";
import { APP_NAME } from "@/configs/envoirmentVars";
import { cn } from "@/lib/utils";

type AuthFormCardProps = {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

const appDisplayName = APP_NAME ?? "Consent Vault";

const AuthFormCard = ({
  title,
  description,
  children,
  footer,
  className,
}: AuthFormCardProps) => (
  <div className={cn("w-full max-w-md", className)}>
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl shadow-brand/5 ring-1 ring-foreground/5">
      <header className="flex flex-col items-center gap-2.5 border-b border-border/60 bg-muted/25 px-8 py-6">
        <img
          src={appIcon}
          alt={`${appDisplayName} icon`}
          className="size-12 rounded-xl shadow-md ring-1 ring-primary/20"
        />
        <span className="text-sm font-semibold tracking-wide text-foreground">
          {appDisplayName}
        </span>
      </header>

      <div className="p-8">
        <div className="mb-6 space-y-1.5">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          {description && (
            <div className="text-sm leading-relaxed text-muted-foreground">{description}</div>
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
  </div>
);

export default AuthFormCard;
