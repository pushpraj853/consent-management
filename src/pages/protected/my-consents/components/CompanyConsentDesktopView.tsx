import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatHumanizedKey, OverflowBadges } from "@/components/shared/overflow-badges";
import {
  type CompanyConsentViewProps,
  formatConsentCount,
  formatConsentDate,
} from "../my-consents.utils";
import ConsentStatusBadge from "./ConsentStatusBadge";
import RevokeConsentAction from "./RevokeConsentAction";

const GRID_ROW_CLASS = "grid w-full grid-cols-5 border-b";
const GRID_CELL_CLASS = "px-4 py-3 text-left align-middle";

const CompanyConsentDesktopView = ({
  companyName,
  consents,
  revoking,
  onRevokeConsent,
}: CompanyConsentViewProps) => (
  <Card className="hidden [--card-spacing:--spacing(6)] md:flex">
    <CardHeader>
      <CardTitle>{companyName}</CardTitle>
      <CardDescription>{formatConsentCount(consents.length)}</CardDescription>
    </CardHeader>

    <CardContent className="pb-4">
      <div className="w-full text-sm">
        <div className={cn(GRID_ROW_CLASS, "font-bold text-foreground")}>
          <div className={GRID_CELL_CLASS}>Purpose</div>
          <div className={GRID_CELL_CLASS}>Status</div>
          <div className={GRID_CELL_CLASS}>Expiry Date</div>
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
                {consent.channel} · {formatConsentDate(consent.submittedAt)}
              </div>
            </div>
            <div className={GRID_CELL_CLASS}>
              <ConsentStatusBadge status={consent.status} />
            </div>
            <div className={GRID_CELL_CLASS}>{formatConsentDate(consent.expiresAt)}</div>
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

export default CompanyConsentDesktopView;
