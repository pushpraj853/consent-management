import { DashboardConsentItemType } from "@/types";
import CompanyConsentSection from "./CompanyConsentSection";
import ConsentSummaryCards from "./ConsentSummaryCards";
import MyConsentsSkeleton from "./MyConsentsSkeleton";

type MyConsentsProps = {
  loading: boolean;
  revoking: boolean;
  totalActive: number;
  totalRevoked: number;
  totalExpired: number;
  consentsByClient: Record<string, DashboardConsentItemType[]>;
  onRevokeConsent: (consentId: string) => Promise<void>;
};

const MyConsents = ({
  loading,
  revoking,
  totalActive,
  totalRevoked,
  totalExpired,
  consentsByClient,
  onRevokeConsent,
}: MyConsentsProps) => {
  const companyEntries = Object.entries(consentsByClient);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="font-heading text-xl font-medium">My Consents</h1>
        <p className="text-sm text-muted-foreground">
          View and manage consents shared with each company.
        </p>
      </div>

      {loading ? (
        <MyConsentsSkeleton />
      ) : (
        <>
          <ConsentSummaryCards
            totalActive={totalActive}
            totalRevoked={totalRevoked}
            totalExpired={totalExpired}
          />

          {companyEntries.length === 0 ? (
            <div className="rounded-xl border border-dashed p-10 text-center">
              <p className="font-medium">No consents yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                When you grant consent to a company, it will appear here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {companyEntries.map(([companyName, consents]) => (
                <CompanyConsentSection
                  key={companyName}
                  companyName={companyName}
                  consents={consents}
                  revoking={revoking}
                  onRevokeConsent={onRevokeConsent}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyConsents;
