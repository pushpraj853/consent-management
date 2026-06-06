import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ConsentStatus } from "@/types";

type ConsentStatusBadgeProps = {
  status: ConsentStatus | string;
};

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-success/10 text-success border-success/20",
  REVOKED: "bg-destructive/10 text-destructive border-destructive/20",
  EXPIRED: "bg-amber-500/10 text-amber-700 border-amber-500/25 dark:text-amber-400",
};

const ConsentStatusBadge = ({ status }: ConsentStatusBadgeProps) => {
  const normalizedStatus = status.toUpperCase();

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-4 px-1.5 py-0 text-[0.7rem]",
        STATUS_STYLES[normalizedStatus] ?? "border-border text-foreground",
      )}
    >
      {normalizedStatus}
    </Badge>
  );
};

export default ConsentStatusBadge;
