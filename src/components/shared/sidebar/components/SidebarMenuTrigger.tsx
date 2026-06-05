import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type SidebarMenuTriggerProps = {
  className?: string;
};

const SidebarMenuTrigger = ({ className }: SidebarMenuTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      variant="ghost"
      size="icon-sm"
      className={cn("shrink-0", className)}
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
    >
      <Menu className="size-4" />
    </Button>
  );
};

export default SidebarMenuTrigger;
