import { lazy } from "react";
import AuthLayout from "../layouts/auth-layout/AuthLayout";
import { ProtectedRoutesType } from "../types";

const MyConsents = lazy(() => import("../pages/protected/my-consents"));
const AuditTrails = lazy(() => import("../pages/protected/audit-trails"));
const ConsentGrant = lazy(() => import("../pages/protected/consent-grant"));
const DashboardLayout = lazy(() => import("../layouts/dashboard-layout/DashboardLayout"));

export const PROTECTED_ROUTES_PATHS = {
  MY_CONSENTS: { path: "/my-consents", label: "My Consents" },
  AUDIT_TRAILS: { path: "/audit-trails", label: "Audit Trails" },
  CONSENT_GRANT: { path: "/consent-grant", label: "Consent Grant" },
} as const;

export const protectedRoutes: ProtectedRoutesType[] = [
  {
    path: PROTECTED_ROUTES_PATHS.MY_CONSENTS.path,
    element: MyConsents,
    layout: DashboardLayout,
    breadcrumb: PROTECTED_ROUTES_PATHS.MY_CONSENTS.label,
    label: PROTECTED_ROUTES_PATHS.MY_CONSENTS.label,
    showInSidebar: true,
  },
  {
    path: PROTECTED_ROUTES_PATHS.AUDIT_TRAILS.path,
    element: AuditTrails,
    layout: DashboardLayout,
    breadcrumb: PROTECTED_ROUTES_PATHS.AUDIT_TRAILS.label,
    label: PROTECTED_ROUTES_PATHS.AUDIT_TRAILS.label,
    showInSidebar: true,
  },
  {
    path: PROTECTED_ROUTES_PATHS.CONSENT_GRANT.path,
    element: ConsentGrant,
    layout: AuthLayout,
    breadcrumb: PROTECTED_ROUTES_PATHS.CONSENT_GRANT.label,
    label: PROTECTED_ROUTES_PATHS.CONSENT_GRANT.label,
    showInSidebar: false,
  },
];
