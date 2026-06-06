import type { LucideIcon } from "lucide-react";

type SidebarNavIconProps = {
  icon: LucideIcon;
};

const SidebarNavIcon = ({ icon: Icon }: SidebarNavIconProps) => (
  <span className="flex size-8 shrink-0 items-center justify-center text-sidebar-foreground/70 group-data-[collapsible=icon]:size-auto">
    <Icon className="size-4" strokeWidth={1.75} absoluteStrokeWidth />
  </span>
);

export default SidebarNavIcon;
