import { Routes, Route, Outlet } from 'react-router-dom';
import { ProtectedRoutes, PageWrapper } from '../components';
import { Landing, Login, Home, User, Album, Photo, NotFound } from '../pages';
import {
  LANDING,
  LOGIN,
  HOME,
  USER,
  ALBUM,
  PHOTO,
} from '../navigation/constants';

/**
 * RouterConfig
 * -----------------------------------------------------------------
 * Centralized routing configuration for the application.
 * - Public routes: accessible without authentication
 * - Protected routes: require authentication (wrapped in <ProtectedRoutes>)
 * - Layout wrapper: <PageWrapper> applies navigation + footer
 * - 404: fallback route for unknown paths
 */
function RouterConfig() {
  return (
    <Routes>
      {/* ---------------- PUBLIC ROUTES ---------------- */}
      {/* Accessible without authentication */}
      <Route path={LANDING} element={<Landing />} />
      <Route path={LOGIN} element={<Login />} />

      {/* ---------------- PROTECTED ROUTES ---------------- */}
      {/* Accessible only after authentication */}
      <Route element={<ProtectedRoutes redirectPath={LOGIN} />}>
        {/* Apply PageWrapper to all protected routes for consistent layout */}
        <Route
          element={
            <PageWrapper>
              {/* Outlet ensures child routes render inside PageWrapper */}
              <Outlet />
            </PageWrapper>
          }
        >
          <Route path={HOME} element={<Home />} />
          <Route path={USER} element={<User />} />
          <Route path={ALBUM} element={<Album />} />
          <Route path={PHOTO} element={<Photo />} />
        </Route>
      </Route>

      {/* ---------------- 404 ROUTE ---------------- */}
      {/* Fallback route when no other route matches */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouterConfig;
