import { lazy } from "react";
import { PERMISSIONS } from "@/constants/permissions";
import { ProtectedRoutesType } from "../types";

const MyConsents = lazy(() => import("../pages/protected/my-consents"));
const AuditTrails = lazy(() => import("../pages/protected/audit-trails"));
const DashboardLayout = lazy(() => import("../layouts/dashboard-layout/DashboardLayout"));

export const PROTECTED_ROUTES_PATHS = {
  MY_CONSENTS: { path: "/my-consents", label: "My Consents" },
  AUDIT_TRAILS: { path: "/audit-trails", label: "Audit Trails" },
} as const;

export const protectedRoutes: ProtectedRoutesType[] = [
  {
    path: PROTECTED_ROUTES_PATHS.MY_CONSENTS.path,
    element: MyConsents,
    layout: DashboardLayout,
    breadcrumb: PROTECTED_ROUTES_PATHS.MY_CONSENTS.label,
    label: PROTECTED_ROUTES_PATHS.MY_CONSENTS.label,
    permission: PERMISSIONS.MY_CONSENTS.VIEW,
    showInSidebar: true,
  },
  {
    path: PROTECTED_ROUTES_PATHS.AUDIT_TRAILS.path,
    element: AuditTrails,
    layout: DashboardLayout,
    breadcrumb: PROTECTED_ROUTES_PATHS.AUDIT_TRAILS.label,
    label: PROTECTED_ROUTES_PATHS.AUDIT_TRAILS.label,
    permission: PERMISSIONS.AUDIT_TRAILS.VIEW,
    showInSidebar: true,
  },
];
