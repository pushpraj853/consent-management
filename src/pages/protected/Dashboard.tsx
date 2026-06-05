import { Button } from "@/components/ui/button";
import { logout } from "../../utils/auth";

const Dashboard = () => {
  return (
    <>
      <div>Dashboard</div>
      <Button variant="outline" onClick={() => logout()}>
        Logout
      </Button>
    </>
  );
};

export default Dashboard;
