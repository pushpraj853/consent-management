import { LogOut } from "lucide-react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SidebarNavIcon from "./SidebarNavIcon";

type SidebarLogoutProps = {
  onLogout: () => void;
};

const SidebarLogout = ({ onLogout }: SidebarLogoutProps) => (
  <SidebarFooter className="border-t border-sidebar-border">
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip="Log out"
          onClick={onLogout}
          className="h-10 gap-3 px-2.5"
        >
          <SidebarNavIcon icon={LogOut} />
          <span>Log out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
);

export default SidebarLogout;
