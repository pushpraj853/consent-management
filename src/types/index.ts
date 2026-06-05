export * from "./routesTypes";
export * from "./userDataTypes.ts";
export * from "./auth.ts";
export * from "./events.ts";

export interface ApiResponse<T> {
  data: T;
  message: string;
  error?: boolean;
}
