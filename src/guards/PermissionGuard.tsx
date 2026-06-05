import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { Permission } from "@/constants/permissions";
import usePermissions from "@/hooks/usePermissions";
import { PROTECTED_ROUTES_PATHS } from "@/routes";

type PermissionGuardProps = {
  permission?: Permission;
  children: ReactNode;
};

const PermissionGuard = ({ permission, children }: PermissionGuardProps) => {
  const { hasPermission } = usePermissions();

  if (!permission || hasPermission(permission)) {
    return <>{children}</>;
  }

  return <Navigate to={PROTECTED_ROUTES_PATHS.MY_CONSENTS.path} replace />;
};

export default PermissionGuard;
