import { PROTECTED_ROUTES_PATHS } from "@/routes";
import PrivateHeader from "../components/PrivateHeader";

const PrivateHeaderContainer = () => (
  <PrivateHeader homePath={PROTECTED_ROUTES_PATHS.MY_CONSENTS.path} />
);

export default PrivateHeaderContainer;
