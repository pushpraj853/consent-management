import { Fragment, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoutesWrapper, PublicRoutesWrapper, AccessGuard } from "./guards";
import {
  protectedRoutes,
  publicRoutes,
  sharedRoutes,
  PUBLIC_ROUTES_PATHS,
  PROTECTED_ROUTES_PATHS,
} from "./routes";
import { BaseRouteType } from "./types";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary, FullPageLoader, ThemeProvider, ToasterWrapper } from "./components/shared";

const App = () => {
  const renderRoutes = <T extends BaseRouteType>(routes: T[]): React.ReactNode[] => {
    return routes.map(({ path, element: Page, layout, userRole, children }) => {
      const Layout = layout ?? Fragment;

      const page = userRole?.length ? (
        <AccessGuard allowedRoles={userRole}>
          <Page />
        </AccessGuard>
      ) : (
        <Page />
      );

      return (
        <Route key={path} path={path} element={<Layout>{page}</Layout>}>
          {children?.length ? renderRoutes(children) : null}
        </Route>
      );
    });
  };

  return (
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback={<FullPageLoader />}>
              <ToasterWrapper />
              <Toaster richColors closeButton />
              <Routes>
                {/* Public Routes */}
                <Route
                  element={
                    <PublicRoutesWrapper redirectRoute={PROTECTED_ROUTES_PATHS.MY_CONSENTS.path} />
                  }
                >
                  {renderRoutes(publicRoutes)}
                </Route>

                {/* Protected Routes */}
                <Route
                  element={
                    <ProtectedRoutesWrapper redirectRoute={PUBLIC_ROUTES_PATHS?.LOGIN?.path} />
                  }
                >
                  {renderRoutes(protectedRoutes)}
                </Route>

                {/* Shared Routes */}
                <Route>{renderRoutes(sharedRoutes)}</Route>

                {/* Catch-all */}
                <Route
                  path="*"
                  element={<Navigate to={PUBLIC_ROUTES_PATHS?.LOGIN?.path} replace />}
                />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;
