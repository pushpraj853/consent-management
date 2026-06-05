import type { LucideIcon } from "lucide-react";
import { SIDEBAR_ITEMS, type ProtectedRouteKey } from "@/constants/sidebarItems";
import { PROTECTED_ROUTES_PATHS, protectedRoutes } from "@/routes/protectedRoutes";

export type SidebarNavItem = {
  path: string;
  label: string;
  icon: LucideIcon;
};

const sidebarConfigByRouteKey = new Map(
  SIDEBAR_ITEMS.map((item) => [item.routeKey, item] as const),
);

const routeKeyByPath = Object.fromEntries(
  (Object.entries(PROTECTED_ROUTES_PATHS) as [ProtectedRouteKey, { path: string }][]).map(
    ([key, { path }]) => [path, key],
  ),
) as Record<string, ProtectedRouteKey>;

export const getSidebarNavItems = (): SidebarNavItem[] =>
  protectedRoutes
    .filter((route) => route.showInSidebar && route.label)
    .map((route) => {
      const routeKey = routeKeyByPath[route.path];
      const config = routeKey ? sidebarConfigByRouteKey.get(routeKey) : undefined;

      if (!config?.icon) {
        return null;
      }

      return {
        path: route.path,
        label: route.label!,
        icon: config.icon,
      };
    })
    .filter((item): item is SidebarNavItem => item !== null);
