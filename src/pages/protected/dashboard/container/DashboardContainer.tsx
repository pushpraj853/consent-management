import { useNavigate } from "react-router-dom";
import { logout } from "@/utils/auth";
import { Dashboard } from "../components";

const DashboardContainer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  return <Dashboard onLogout={handleLogout} />;
};

export default DashboardContainer;
