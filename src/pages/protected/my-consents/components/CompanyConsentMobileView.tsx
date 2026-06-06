import { Card, CardContent } from "@/components/ui/card";
import { formatHumanizedKey, OverflowBadges } from "@/components/shared/overflow-badges";
import {
  type CompanyConsentViewProps,
  formatConsentCount,
  formatConsentDate,
} from "../my-consents.utils";
import ConsentStatusBadge from "./ConsentStatusBadge";
import RevokeConsentAction from "./RevokeConsentAction";

const CompanyConsentMobileView = ({
  companyName,
  consents,
  revoking,
  onRevokeConsent,
}: CompanyConsentViewProps) => (
  <section className="flex flex-col gap-4 md:hidden">
    <div>
      <h2 className="font-heading text-base font-medium">{companyName}</h2>
      <p className="text-sm text-muted-foreground">{formatConsentCount(consents.length)}</p>
    </div>

    {consents.map((consent) => {
      const isActive = consent.status.toUpperCase() === "ACTIVE";

      return (
        <Card key={consent.consentId} className="gap-0 py-0 [--card-spacing:--spacing(4)]">
          <CardContent className="flex flex-col gap-3 px-4 py-4">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold">Consent For:</span>
                <ConsentStatusBadge status={consent.status} />
              </div>
              <p className="text-sm leading-tight">{consent.purposeName}</p>
              <p className="text-xs leading-tight text-muted-foreground">
                {formatConsentDate(consent.submittedAt)} · {formatHumanizedKey(consent.channel)}
              </p>
            </div>

            <div className="my-2">
              <p className="text-xs font-bold">Data Shared</p>
              <div className="mt-1.5">
                <OverflowBadges items={consent.dataShared} getLabel={formatHumanizedKey} />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold">Expiry Date</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatConsentDate(consent.expiresAt)}
              </p>
            </div>

            {isActive ? (
              <div className="pt-1 [&_button]:w-full">
                <RevokeConsentAction
                  consent={consent}
                  companyName={companyName}
                  revoking={revoking}
                  onRevokeConsent={onRevokeConsent}
                  hideInactive
                />
              </div>
            ) : null}
          </CardContent>
        </Card>
      );
    })}
  </section>
);

export default CompanyConsentMobileView;
