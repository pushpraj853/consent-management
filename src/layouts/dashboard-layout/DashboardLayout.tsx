import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <DashboardHeader />
      {children}
      <DashboardFooter />
    </>
  );
};

export default DashboardLayout;
