import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATHS } from "@/routes";
import { logout } from "@/utils/auth";
import Sidebar from "../components/Sidebar";
import { getSidebarNavItems } from "../sidebar.utils";

const SidebarContainer = () => {
  const navigate = useNavigate();
  const items = getSidebarNavItems();

  const handleLogout = () => {
    void logout(navigate);
  };

  return (
    <Sidebar
      homePath={PROTECTED_ROUTES_PATHS.MY_CONSENTS.path}
      items={items}
      onLogout={handleLogout}
    />
  );
};

export default SidebarContainer;
