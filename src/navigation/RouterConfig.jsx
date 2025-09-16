import { Routes, Route, Outlet } from 'react-router-dom';
import ProtectedRoutes from '../components/guards/ProtectedRoutes';
import PageWrapper from '../components/layout/PageWrapper';
import { Landing, Login, Home, User, Album, Photo, NotFound } from '../pages';
import { LANDING, LOGIN, HOME, USER, ALBUM, PHOTO } from './constants';

export default function RouterConfig() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path={LANDING} element={<Landing />} />
      <Route path={LOGIN} element={<Login />} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoutes />}>
        <Route
          element={
            <PageWrapper>
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

      {/* 404 ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
