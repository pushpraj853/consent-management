import { ThemeToggle } from "@/components/shared";
import { SidebarMenuTrigger } from "@/components/shared/sidebar";

const PrivateHeader = () => (
  <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
    <SidebarMenuTrigger className="md:hidden" />
    <div className="ml-auto flex items-center gap-2">
      <ThemeToggle />
    </div>
  </header>
);

export default PrivateHeader;
