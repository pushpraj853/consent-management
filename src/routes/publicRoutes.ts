import React from "react";
import AuthLayout from "../layouts/auth-layout/AuthLayout";
import { PublicRoutesType } from "../types";

const LoginPage = React.lazy(() => import("../pages/public/login"));
const ForgotPasswordPage = React.lazy(() => import("../pages/public/forgot-password"));

export const PUBLIC_ROUTES_PATHS = {
  LOGIN: { path: "/login", label: "Login" },
  FORGOT_PASSWORD: { path: "/forgot-password", label: "Forgot Password" },
};

export const publicRoutes: PublicRoutesType[] = [
  {
    path: PUBLIC_ROUTES_PATHS.LOGIN.path,
    element: LoginPage,
    layout: AuthLayout,
    breadcrumb: PUBLIC_ROUTES_PATHS.LOGIN.label,
  },
  {
    path: PUBLIC_ROUTES_PATHS.FORGOT_PASSWORD.path,
    element: ForgotPasswordPage,
    layout: AuthLayout,
    breadcrumb: PUBLIC_ROUTES_PATHS.FORGOT_PASSWORD.label,
  },
];
