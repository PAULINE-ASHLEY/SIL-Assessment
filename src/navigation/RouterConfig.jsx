import { Routes, Route, Outlet } from 'react-router-dom';
import ProtectedRoutes from '../components/guards/ProtectedRoutes';
import PageWrapper from '../components/layout/PageWrapper';
import {
  Landing,
  Login,
  Home,
  Signup,
  NotFound,
  User,
  Album,
  Photo,
  UserMain,
  AlbumMain,
  PhotoMain,
} from '../pages';
import {
  LANDING,
  LOGIN,
  HOME,
  SIGNUP,
  USER,
  ALBUM,
  PHOTO,
  USERMAIN,
  ALBUMMAIN,
  PHOTOMAIN,
} from './constants';

export default function RouterConfig() {
  return (
    <Routes>
      {/* Public */}
      <Route path={LANDING} element={<Landing />} />
      <Route path={LOGIN} element={<Login />} />
      <Route path={SIGNUP} element={<Signup />} />

      {/* Protected */}
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
          <Route path={USERMAIN} element={<UserMain />} />
          <Route path={ALBUMMAIN} element={<AlbumMain />} />
          <Route path={PHOTOMAIN} element={<PhotoMain />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
