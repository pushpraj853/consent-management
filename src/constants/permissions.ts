export const PERMISSIONS = {
  MY_CONSENTS: {
    VIEW: "my-consents:view",
    EDIT: "my-consents:edit",
  },
  AUDIT_TRAILS: {
    VIEW: "audit-trails:view",
    EDIT: "audit-trails:edit",
  },
  USER_PROFILE: {
    EDIT: "user-profile:edit",
  },
} as const;

type ValueOf<T> = T[keyof T];

export type Permission =
  | ValueOf<typeof PERMISSIONS.MY_CONSENTS>
  | ValueOf<typeof PERMISSIONS.AUDIT_TRAILS>
  | ValueOf<typeof PERMISSIONS.USER_PROFILE>;
