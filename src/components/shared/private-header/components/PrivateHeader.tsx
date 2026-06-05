import { ThemeToggle } from "@/components/shared";
import { SidebarMenuTrigger } from "@/components/shared/sidebar";
import UserMenu from "./UserMenu";

type PrivateHeaderProps = {
  displayName: string;
  onLogout: () => void;
};

const PrivateHeader = ({ displayName, onLogout }: PrivateHeaderProps) => (
  <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
    <SidebarMenuTrigger className="md:hidden" />
    <div className="ml-auto flex items-center gap-2">
      <ThemeToggle />
      <UserMenu displayName={displayName} onLogout={onLogout} />
    </div>
  </header>
);

export default PrivateHeader;
