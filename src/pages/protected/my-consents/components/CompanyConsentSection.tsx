import { type CompanyConsentViewProps } from "../my-consents.utils";
import CompanyConsentDesktopView from "./CompanyConsentDesktopView";
import CompanyConsentMobileView from "./CompanyConsentMobileView";

const CompanyConsentSection = (props: CompanyConsentViewProps) => (
  <>
    <CompanyConsentMobileView {...props} />
    <CompanyConsentDesktopView {...props} />
  </>
);

export default CompanyConsentSection;
