import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { CountryContext } from '../../providers/CountryProvider';

import { COUNTRIES_PATH, HOME_PATH, PRODUCTS_PATH, SHOPPING_CART_PATH } from '../../utils';

export const LeftNavigation = () => {
  const { countryLikes } = useContext(CountryContext);
  console.log('CountryContext', countryLikes);
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" to={HOME_PATH}>
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={COUNTRIES_PATH}>
          <span className="font-weight-bold">Favored: {countryLikes.totalLiked}</span>
        </Link>
      </li>
    </ul>
  );
};
