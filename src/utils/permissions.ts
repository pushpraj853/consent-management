import { PERMISSIONS, type Permission } from "@/constants/permissions";
import { decodeJWTToken } from "./auth";

const ALL_PERMISSIONS = [
  PERMISSIONS.MY_CONSENTS.VIEW,
  PERMISSIONS.MY_CONSENTS.EDIT,
  PERMISSIONS.AUDIT_TRAILS.VIEW,
  PERMISSIONS.AUDIT_TRAILS.EDIT,
  PERMISSIONS.USER_PROFILE.EDIT,
] as const satisfies readonly Permission[];

export const getUserPermissions = (token: string | null): Permission[] => {
  if (!token) {
    return [];
  }

  const decoded = decodeJWTToken(token);
  const permissions = decoded?.permissions;

  if (Array.isArray(permissions) && permissions.length > 0) {
    return permissions.filter((permission): permission is Permission => typeof permission === "string");
  }

  // Fallback for legacy tokens or role-only auth until API returns permissions
  const role = decoded?.userRole ?? decoded?.userType ?? decoded?.role;
  if (role === "admin") {
    return [...ALL_PERMISSIONS];
  }

  return [];
};

export const hasPermission = (
  userPermissions: Permission[],
  permission: Permission,
): boolean => userPermissions.includes(permission);
