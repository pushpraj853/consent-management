import { useState } from "react";
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DashboardConsentItemType } from "@/types";

type RevokeConsentActionProps = {
  consent: DashboardConsentItemType;
  companyName: string;
  revoking: boolean;
  onRevokeConsent: (consentId: string) => Promise<void>;
  hideInactive?: boolean;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const RevokeConsentAction = ({
  consent,
  companyName,
  revoking,
  onRevokeConsent,
  hideInactive = false,
}: RevokeConsentActionProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const status = consent.status.toUpperCase();
  const canRevoke = status === "ACTIVE";

  const handleConfirmRevoke = async () => {
    await onRevokeConsent(consent.consentId);
    setDialogOpen(false);
  };

  if (!canRevoke && hideInactive) {
    return null;
  }

  if (canRevoke) {
    return (
      <>
        <Button
          variant="default"
          size="default"
          disabled={revoking}
          onClick={() => setDialogOpen(true)}
          className="min-w-24 bg-destructive text-white shadow-sm enabled:hover:bg-destructive/90"
        >
          <Ban data-icon="inline-start" />
          Revoke
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Revoke consent?</DialogTitle>
              <DialogDescription>
                {companyName} will no longer be able to use your data for
                &ldquo;{consent.purposeName}&rdquo;. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                disabled={revoking}
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                disabled={revoking}
                className="bg-destructive text-white enabled:hover:bg-destructive/90"
                onClick={() => void handleConfirmRevoke()}
              >
                {revoking ? "Revoking..." : "Revoke"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  const actionLabel = status === "REVOKED" ? "Revoked" : "Expired";
  const tooltipText =
    status === "REVOKED" && consent.revokedAt
      ? `Revoked on ${formatDate(consent.revokedAt)}`
      : status === "EXPIRED"
        ? `Expired on ${formatDate(consent.expiresAt)}`
        : undefined;

  const inactiveAction = (
    <Button
      variant="outline"
      size="default"
      disabled
      className={cn(
        "min-w-24 shadow-sm disabled:opacity-100",
        status === "REVOKED"
          ? "border-destructive/25 bg-destructive/10 text-destructive/70"
          : "border-border bg-muted text-muted-foreground",
      )}
    >
      <Ban data-icon="inline-start" />
      {actionLabel}
    </Button>
  );

  if (!tooltipText) {
    return inactiveAction;
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span className="inline-flex">{inactiveAction}</span>
        }
      />
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
};

export default RevokeConsentAction;
