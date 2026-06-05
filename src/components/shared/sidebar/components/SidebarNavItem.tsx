import { NavLink, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

type SidebarNavItemProps = {
  path: string;
  label: string;
  icon: LucideIcon;
};

const SidebarNavItem = ({ path, label, icon: Icon }: SidebarNavItemProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === path;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} tooltip={label} render={<NavLink to={path} />}>
        <Icon />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarNavItem;
