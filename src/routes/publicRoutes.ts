import React from "react";
import AuthLayout from "../layouts/auth-layout/AuthLayout";
import { PublicRoutesType } from "../types";

const LoginPage = React.lazy(() => import("../pages/public/LoginPage"));
const ForgotPasswordPage = React.lazy(() => import("../pages/public/ForgotPasswordPage"));

export const PUBLIC_ROUTES_PATHS = {
  LOGIN: { path: "/login", label: "Login" },
  FORGOT_PASSWORD: { path: "/forgot-password", label: "Forgot Password" },
  // Add more public route paths here as needed
  // Example: SIGNUP: { path: "/signup", label: "Signup" },
};

// Public route definitions
export const publicRoutes: PublicRoutesType[] = [
  {
    path: PUBLIC_ROUTES_PATHS?.LOGIN.path, // /login
    element: LoginPage,
    layout: AuthLayout,
    breadcrumb: PUBLIC_ROUTES_PATHS?.LOGIN.label,
  },
  {
    path: PUBLIC_ROUTES_PATHS?.FORGOT_PASSWORD.path, // /forgot-password
    element: ForgotPasswordPage,
    layout: AuthLayout,
    breadcrumb: PUBLIC_ROUTES_PATHS?.FORGOT_PASSWORD.label,
  },
];
// Add more public routes here as needed
// Example: { path: "/signup", element: SignupPage, layout: AuthLayout },
// Example: { path: "/about", element: AboutPage, layout: PublicLayout },
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
