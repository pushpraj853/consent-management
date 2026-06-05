import { Fragment, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoutesWrapper, PublicRoutesWrapper, AccessGuard } from "./guards";
import { protectedRoutes, publicRoutes, sharedRoutes } from "./routes";
import { BaseRouteType } from "./types";
import { PROTECTED_ROUTES_PATHS } from "./routes/protectedRoutes";
import { PUBLIC_ROUTES_PATHS } from "./routes/publicRoutes";
import ErrorBoundary from "./components/shared/ErrorBoundary";

const App = () => {
  const renderRoutes = <T extends BaseRouteType>(routes: T[]): React.ReactNode[] => {
    return routes.map(({ path, element: Page, layout, userRole, children }) => {
      const Layout = layout ?? Fragment;
      return (
        <Route
          key={path}
          path={path}
          element={
            userRole?.length ? (
              <Layout>
                <AccessGuard allowedRoles={userRole}>
                  <Page />
                </AccessGuard>
              </Layout>
            ) : (
              <Layout>
                <Page />
              </Layout>
            )
          }
        >
          {children?.length ? renderRoutes(children) : null}
        </Route>
      );
    });
  };

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route
              element={
                <PublicRoutesWrapper redirectRoute={PROTECTED_ROUTES_PATHS.DASHBOARD.path} />
              }
            >
              {renderRoutes(publicRoutes)}
            </Route>

            {/* Protected Routes */}
            <Route
              element={<ProtectedRoutesWrapper redirectRoute={PUBLIC_ROUTES_PATHS?.LOGIN?.path} />}
            >
              {renderRoutes(protectedRoutes)}
            </Route>

            {/* Shared Routes */}
            <Route>{renderRoutes(sharedRoutes)}</Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to={PUBLIC_ROUTES_PATHS?.LOGIN?.path} replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
