import usePermissions from "@/hooks/usePermissions";
import { PROTECTED_ROUTES_PATHS } from "@/routes";
import Sidebar from "../components/Sidebar";
import { getSidebarNavItems } from "../sidebar.utils";

const SidebarContainer = () => {
  const { hasPermission } = usePermissions();
  const items = getSidebarNavItems(hasPermission);

  return (
    <Sidebar
      homePath={PROTECTED_ROUTES_PATHS.MY_CONSENTS.path}
      items={items}
    />
  );
};

export default SidebarContainer;
