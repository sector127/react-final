import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { loginAsync, registerAsync } from '../../api/auth.service';
import { HOME_PATH, LOGIN_PATH, PRODUCTS_PATH } from '../../utils';

export const authContext = createContext({});

authContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('kountriz', false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    const user = await loginAsync(credentials);
    console.log('user', user);
    if (user && user.token) {
      setUser(true);
      navigate(HOME_PATH);
    } else {
      setUser(false);
      navigate(LOGIN_PATH);
    }
  };

  const register = async (credentials) => {
    const newUser = await registerAsync(credentials);
    console.log('__NEW_USER__', newUser);
    if (newUser && user.token) {
      setUser(true);
      navigate(HOME_PATH);
    } else {
      setUser(false);
    }
  };
  const logOut = () => {
    setUser(false);
    navigate(LOGIN_PATH);
  };

  return (
    <authContext.Provider
      value={{
        login,
        register,
        logOut,
        user,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuthProvider = () => {
  const auth = useContext(authContext);
  if (!auth) {
    throw SyntaxError('AuthProvider is not defined');
  }

  return auth;
};
