import { ClipboardList, ScrollText, type LucideIcon } from "lucide-react";
import { PERMISSIONS, type Permission } from "./permissions";
import type { PROTECTED_ROUTES_PATHS } from "@/routes/protectedRoutes";

export type ProtectedRouteKey = keyof typeof PROTECTED_ROUTES_PATHS;

export type SidebarItemConfig = {
  routeKey: ProtectedRouteKey;
  permission: Permission;
  icon: LucideIcon;
};

export const SIDEBAR_ITEMS: SidebarItemConfig[] = [
  {
    routeKey: "MY_CONSENTS",
    permission: PERMISSIONS.MY_CONSENTS.VIEW,
    icon: ClipboardList,
  },
  {
    routeKey: "AUDIT_TRAILS",
    permission: PERMISSIONS.AUDIT_TRAILS.VIEW,
    icon: ScrollText,
  },
];
