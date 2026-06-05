import { ReactNode } from "react";
import type { Permission } from "@/constants/permissions";

export interface BaseRouteType {
  path: string;
  element: React.ComponentType;
  layout?: React.ComponentType<{ children: ReactNode }>; // layout component
  label?: string; // for sidebar menu
  icon?: React.ReactNode; // optional: for menu icons
  showInSidebar?: boolean;
  breadcrumb?: string; // used for breadcrumbs
  children?: ProtectedRoutesType[]; // nested routes
  userRole?: string[]; // optional: access control,  Example: ["admin", "team-member"]
  permission?: Permission; // optional: permission required to access route
}
export type PublicRoutesType = BaseRouteType;
export type ProtectedRoutesType = BaseRouteType;
export type SharedRoutesType = BaseRouteType;
