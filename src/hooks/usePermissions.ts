export interface UserPermissions {
  canViewReports: boolean;
  canEditUser: boolean;
  canDeleteProduct: boolean;
  // etc.
}

const usePermissions = (): UserPermissions => {
  // Get this from user data / auth token / store
  return {
    canViewReports: true,
    canEditUser: false,
    canDeleteProduct: true,
  } as UserPermissions;
};

export default usePermissions;
