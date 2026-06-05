import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { SidebarNavItem as SidebarNavItemType } from "../sidebar.utils";
import SidebarBrand from "./SidebarBrand";
import SidebarMenuTrigger from "./SidebarMenuTrigger";
import SidebarNavItem from "./SidebarNavItem";

type SidebarProps = {
  homePath: string;
  items: SidebarNavItemType[];
};

const Sidebar = ({ homePath, items }: SidebarProps) => (
  <ShadcnSidebar collapsible="icon">
    <SidebarHeader className="flex-row items-center gap-2 border-b border-sidebar-border px-2 py-3">
      <SidebarMenuTrigger />
      <SidebarBrand homePath={homePath} />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarNavItem
                key={item.path}
                path={item.path}
                label={item.label}
                icon={item.icon}
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </ShadcnSidebar>
);

export default Sidebar;
