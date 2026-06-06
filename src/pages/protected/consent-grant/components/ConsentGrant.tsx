import appIcon from "@/assets/icons/app-icon.webp";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/configs/envoirmentVars";
import { cn } from "@/lib/utils";
import { ConsentGrantClientType } from "@/types/consent-grant";
import { ArrowLeftRight, CheckCircle2 } from "lucide-react";

type ConsentGrantProps = {
  client: ConsentGrantClientType;
  loading: boolean;
  onAllow: () => void;
  onDeny: () => void;
};

const appDisplayName = APP_NAME ?? "Consent Vault";

const ConsentGrant = ({ client, loading, onAllow, onDeny }: ConsentGrantProps) => (
  <div className="w-full max-w-xl">
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl shadow-brand/5 ring-1 ring-foreground/5">
      <div className="border-b border-border/60 bg-muted/20 px-6 py-8 sm:px-10">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
          <div className="flex flex-col items-center gap-2">
            <img
              src={appIcon}
              alt={`${appDisplayName} icon`}
              className="size-14 rounded-2xl bg-background p-2 shadow-md ring-1 ring-primary/20 sm:size-16"
            />
            <span className="text-xs font-medium text-muted-foreground">{appDisplayName}</span>
          </div>

          <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <ArrowLeftRight className="size-5" aria-hidden />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-background p-3 shadow-md ring-1 ring-border/60 sm:size-16">
              <img
                src={client.companyLogoUrl}
                alt={`${client.companyName} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{client.companyName}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-6 py-8 sm:px-10">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {client.companyName} wants to access your account
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">{client.description}</p>
        </div>

        <ul className="space-y-3 rounded-xl border border-border/60 bg-muted/15 p-4 sm:p-5">
          {client.dataKeys.map((dataKey) => (
            <li key={dataKey} className="flex items-start gap-3 text-sm">
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              <span className="font-medium text-foreground">{dataKey}</span>
            </li>
          ))}
        </ul>

        <p className="rounded-lg bg-muted/25 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          {client.companyName} will use this data only for{" "}
          <span className="font-medium text-foreground">{client.consentDuration} days</span>{" "}
          as promised, after which access will expire automatically.
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            disabled={loading}
            onClick={onDeny}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="lg"
            className={cn("w-full sm:w-auto", loading && "opacity-80")}
            disabled={loading}
            onClick={onAllow}
          >
            {loading ? "Allowing..." : "Allow"}
          </Button>
        </div>

        <p className="text-center text-xs leading-relaxed text-muted-foreground sm:text-left">
          By clicking Allow, you authorize {client.companyName} to access the listed data through{" "}
          {appDisplayName}. You can revoke this consent anytime from My Consents.
        </p>
      </div>
    </div>
  </div>
);

export default ConsentGrant;
