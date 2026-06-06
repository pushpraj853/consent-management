import { ThemeToggle } from "@/components/shared";
import { SidebarMenuTrigger } from "@/components/shared/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import HeaderBrand from "./HeaderBrand";

type PrivateHeaderProps = {
  homePath: string;
};

const PrivateHeader = ({ homePath }: PrivateHeaderProps) => {
  const { state, isMobile, openMobile } = useSidebar();
  const isSidebarClosed = isMobile ? !openMobile : state === "collapsed";

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
      <SidebarMenuTrigger className="md:hidden" />
      {isSidebarClosed ? <HeaderBrand homePath={homePath} /> : null}
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default PrivateHeader;
