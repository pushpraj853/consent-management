import { lazy } from "react";
import { ProtectedRoutesType } from "../types";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const DashboardLayout = lazy(() => import("../layouts/dashboard-layout/DashboardLayout"));

// Define protected route paths
// Add more protected route paths here as needed
// Example: SETTINGS: { path: "/settings", label: "Settings"}

export const PROTECTED_ROUTES_PATHS = {
  DASHBOARD: { path: "/dashboard", label: "Dashboard" },
};

export const protectedRoutes: ProtectedRoutesType[] = [
  {
    path: PROTECTED_ROUTES_PATHS?.DASHBOARD.path, // /dashboard
    element: Dashboard,
    layout: DashboardLayout,
    breadcrumb: PROTECTED_ROUTES_PATHS?.DASHBOARD.label,
    label: PROTECTED_ROUTES_PATHS?.DASHBOARD.label,
    icon: "📊",
    showInSidebar: true,
  },
];

// Add more protected routes here as needed
// Example: { path: "/profile", component: Profile, label: "Profile", icon: "👤", showInSidebar: true, userRole:["admin", "team-member"] },
// Example:{
//   path: PUBLIC_ROUTES_PATHS.SETTINGS.path, // /settings
//   element: <Settings />,
//   layout: DashboardLayout,
//   breadcrumb: PUBLIC_ROUTES_PATHS.SETTINGS.label,
//   children: [
//     {
//       path: "security", // becomes /settings/security
//       element: <Security />,
//       breadcrumb: "Security",
//     },
//   ],
// },
