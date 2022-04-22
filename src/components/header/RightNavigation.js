import { NavLink } from 'react-router-dom';
import { useAuthProvider } from '../../providers/AuthProvider';

import { Button } from '../../atoms';
import { LOGIN_PATH, REGISTER_PATH, PROFILE_PATH } from '../../utils';

export const RightNavigation = (props) => {
  const { user, logOut } = useAuthProvider();
  const renderGuestNavLinks = () => {
    return (
      <>
        <li className="nav-item">
          <NavLink className="nav-link" to={LOGIN_PATH}>
            Login ⎆
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={REGISTER_PATH}>
            Register ✅
          </NavLink>
        </li>
      </>
    );
  };

  const renderUserNavLinks = () => {
    return (
      <>
        <li className="nav-item">
          <NavLink className="nav-link" to={PROFILE_PATH}>
            Profile <i className="fa fa-user-check"></i>
          </NavLink>
        </li>
        <li className="nav-item">
          <Button
            className="btn btn-link nav-link"
            onClick={() => {
              logOut();
            }}
          >
            Login Out
          </Button>
        </li>
      </>
    );
  };

  return (
    <ul className="navbar-nav mb-2 mb-lg-0">
      {user ? renderUserNavLinks() : renderGuestNavLinks()}
    </ul>
  );
};
