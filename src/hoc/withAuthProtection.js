import { Loader } from '../atoms';
import { useRequireAuth } from '../hooks';

export const withAuthProtection = (WrappedComponent) => {
  const AuthProtection = (props) => {
    const auth = useRequireAuth();
    if (!auth) {
      return <Loader />;
    }
    return <WrappedComponent {...props} />;
  };
  AuthProtection.displayname = 'AuthProtection';
  return AuthProtection;
};
