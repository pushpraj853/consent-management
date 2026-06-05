import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import { logout } from "@/utils/auth";
import PrivateHeader from "../components/PrivateHeader";

const PrivateHeaderContainer = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userCredential?.user);

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username || "User";

  const handleLogout = () => {
    void logout(navigate);
  };

  return <PrivateHeader displayName={displayName} onLogout={handleLogout} />;
};

export default PrivateHeaderContainer;
