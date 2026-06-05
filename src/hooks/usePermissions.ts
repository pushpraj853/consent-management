import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { Permission } from "@/constants/permissions";
import { RootState } from "@/store";
import { getUserPermissions, hasPermission as checkPermission } from "@/utils/permissions";

const usePermissions = () => {
  const token = useSelector((state: RootState) => state.userCredential?.token);

  const permissions = useMemo(() => getUserPermissions(token), [token]);

  const hasPermission = (permission: Permission) => checkPermission(permissions, permission);

  const hasAnyPermission = (requiredPermissions: Permission[]) =>
    requiredPermissions.some(hasPermission);

  return { permissions, hasPermission, hasAnyPermission };
};

export default usePermissions;
