import { ThemeToggle } from "@/components/shared";

const DashboardHeader = () => {
  return (
    <header className="flex h-14 items-center justify-end border-b px-4">
      <ThemeToggle />
    </header>
  );
};

export default DashboardHeader;
