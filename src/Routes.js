import { lazy, Suspense } from 'react';
import { Routes as Router, Route } from 'react-router-dom';

import { Loader } from './atoms';
import { Layout, LayoutSign } from './components/layout';
import { Home } from './pages/home';
import Profile from './pages/profile';
import { NoMatch } from './pages/NoMatch';
import * as routes from './utils/routePaths';
import { LoginForm, RegisterForm } from './components/auth';

const FavoriteCountries = lazy(() => import('./pages/favorite-countries'));

export const Routes = () => {
  return (
    <Router>
      <Route element={<LayoutSign />}>
        <Route path={routes.LOGIN_PATH} element={<LoginForm />} />
        <Route path={routes.REGISTER_PATH} element={<RegisterForm />} />
      </Route>
      <Route element={<Layout />}>
        <Route path={routes.HOME_PATH} element={<Home />} />
        <Route
          path={routes.COUNTRIES_PATH}
          element={
            <Suspense fallback={<Loader message="Shopping Cart Loading..." />}>
              <FavoriteCountries />
            </Suspense>
          }
        />
        <Route path={routes.PROFILE_PATH} element={<Profile title="Page title" />} />
        <Route path={routes.NO_MATCH_PATH} element={<NoMatch />} />
      </Route>
    </Router>
  );
};

Routes.displayName = 'AppRoutes';
