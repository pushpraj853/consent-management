import { History, ShieldCheck, type LucideIcon } from "lucide-react";
import type { PROTECTED_ROUTES_PATHS } from "@/routes/protectedRoutes";

export type ProtectedRouteKey = keyof typeof PROTECTED_ROUTES_PATHS;

export type SidebarItemConfig = {
  routeKey: ProtectedRouteKey;
  icon: LucideIcon;
};

export const SIDEBAR_ITEMS: SidebarItemConfig[] = [
  {
    routeKey: "MY_CONSENTS",
    icon: ShieldCheck,
  },
  {
    routeKey: "AUDIT_TRAILS",
    icon: History,
  },
];
