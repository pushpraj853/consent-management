export * from "./routesTypes";
export * from "./userDataTypes.ts";
export * from "./auth.ts";
export * from "./browserEvents.ts";
export * from "./consent.ts";
export * from "./consent-grant";

export interface ApiResponse<T> {
  data: T;
  message: string;
  error?: boolean;
}
