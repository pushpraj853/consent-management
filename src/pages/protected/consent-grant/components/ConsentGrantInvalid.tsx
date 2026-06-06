import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

type ConsentGrantInvalidProps = {
  actionLabel: string;
  onAction: () => void;
};

const ConsentGrantInvalid = ({ actionLabel, onAction }: ConsentGrantInvalidProps) => (
  <div className="w-full max-w-md">
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card p-8 text-center shadow-xl shadow-brand/5 ring-1 ring-foreground/5">
      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="size-6" aria-hidden />
      </div>
      <h1 className="text-xl font-semibold tracking-tight">Invalid consent request</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        This consent link is invalid, expired, or missing a valid return URL. Please contact the
        requesting organization for a new link.
      </p>
      <Button type="button" className="mt-6 w-full" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  </div>
);

export default ConsentGrantInvalid;
