import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthProvider } from '../providers/AuthProvider';
import { LOGIN_PATH, REGISTER_PATH } from '../utils/routePaths';

export const useRequireAuth = (redirectUrl = LOGIN_PATH) => {
  const { user } = useAuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(redirectUrl);
    }
  }, [user, navigate, redirectUrl]);

  return user;
};
