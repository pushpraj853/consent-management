import { ReactNode } from "react";

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
}
export type PublicRoutesType = BaseRouteType;
export type ProtectedRoutesType = BaseRouteType;
export type SharedRoutesType = BaseRouteType;
