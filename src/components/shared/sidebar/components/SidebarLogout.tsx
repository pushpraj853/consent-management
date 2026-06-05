import { LogOut } from "lucide-react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type SidebarLogoutProps = {
  onLogout: () => void;
};

const SidebarLogout = ({ onLogout }: SidebarLogoutProps) => (
  <SidebarFooter className="border-t border-sidebar-border">
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Log out" onClick={onLogout}>
          <LogOut />
          <span>Log out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
);

export default SidebarLogout;
