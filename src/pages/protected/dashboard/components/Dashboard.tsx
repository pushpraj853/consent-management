import { Button } from "@/components/ui/button";

type DashboardProps = {
  onLogout: () => void;
};

const Dashboard = ({ onLogout }: DashboardProps) => {
  return (
    <>
      <div>Dashboard</div>
      <Button variant="outline" onClick={onLogout}>
        Logout
      </Button>
    </>
  );
};

export default Dashboard;
