import PublicLayout from "../layouts/public-layout/PublicLayout";
import SharedPage from "../pages/shared/SharedPage";
import { SharedRoutesType } from "../types";

export const SHARED_ROUTES_PATH = {
  PRODUCTS: { path: "/shared-page", label: "Shared Page" },
  MANAGE_CONSENTS: { path: "/manage/:token", label: "Manage Consents" },
};

export const sharedRoutes: SharedRoutesType[] = [
  {
    path: SHARED_ROUTES_PATH?.PRODUCTS?.path,
    element: SharedPage,
    layout: PublicLayout,
    breadcrumb: SHARED_ROUTES_PATH?.PRODUCTS?.label,
    label: SHARED_ROUTES_PATH?.PRODUCTS?.label,
  },
];
