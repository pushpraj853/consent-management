import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DashboardConsentItemType } from "@/types";
import { formatHumanizedKey, OverflowBadges } from "@/components/shared/overflow-badges";
import ConsentStatusBadge from "./ConsentStatusBadge";
import RevokeConsentAction from "./RevokeConsentAction";

type CompanyConsentSectionProps = {
  companyName: string;
  consents: DashboardConsentItemType[];
  revoking: boolean;
  onRevokeConsent: (consentId: string) => Promise<void>;
};

const GRID_ROW_CLASS = "grid w-full grid-cols-4 border-b";
const GRID_CELL_CLASS = "px-4 py-3 text-left align-middle";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const CompanyConsentSection = ({
  companyName,
  consents,
  revoking,
  onRevokeConsent,
}: CompanyConsentSectionProps) => (
  <Card className="[--card-spacing:--spacing(6)]">
    <CardHeader>
      <CardTitle>{companyName}</CardTitle>
      <CardDescription>
        {consents.length} consent{consents.length !== 1 ? "s" : ""}
      </CardDescription>
    </CardHeader>

    <CardContent className="pb-4">
      <div className="w-full text-sm">
        <div className={cn(GRID_ROW_CLASS, "font-medium text-foreground")}>
          <div className={GRID_CELL_CLASS}>Purpose</div>
          <div className={GRID_CELL_CLASS}>Status</div>
          <div className={GRID_CELL_CLASS}>Data Shared</div>
          <div className={GRID_CELL_CLASS}>Action</div>
        </div>

        {consents.map((consent) => (
          <div
            key={consent.consentId}
            className={cn(GRID_ROW_CLASS, "transition-colors last:border-b-0 hover:bg-muted/50")}
          >
            <div className={cn(GRID_CELL_CLASS, "whitespace-normal")}>
              <div className="font-medium">{consent.purposeName}</div>
              <div className="text-xs text-muted-foreground">
                {consent.channel} · {formatDate(consent.submittedAt)}
              </div>
            </div>
            <div className={GRID_CELL_CLASS}>
              <ConsentStatusBadge status={consent.status} />
            </div>
            <div className={cn(GRID_CELL_CLASS, "whitespace-normal")}>
              <OverflowBadges items={consent.dataShared} getLabel={formatHumanizedKey} />
            </div>
            <div className={GRID_CELL_CLASS}>
              <RevokeConsentAction
                consent={consent}
                companyName={companyName}
                revoking={revoking}
                onRevokeConsent={onRevokeConsent}
              />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default CompanyConsentSection;
