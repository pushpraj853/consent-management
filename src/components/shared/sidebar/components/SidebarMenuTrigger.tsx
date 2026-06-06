import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type SidebarMenuTriggerProps = {
  className?: string;
};

const SidebarMenuTrigger = ({ className }: SidebarMenuTriggerProps) => {
  const { toggleSidebar, isMobile, openMobile, state } = useSidebar();
  const isOpen = isMobile ? openMobile : state === "expanded";

  return (
    <Button
      data-sidebar="trigger"
      variant="ghost"
      size="icon-sm"
      className={cn("shrink-0", className)}
      onClick={toggleSidebar}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
    </Button>
  );
};

export default SidebarMenuTrigger;
