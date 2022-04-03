import { Loader } from '../../atoms';
import { useRequireAuth } from '../../hooks';

export const FavoriteCountries = () => {
  const auth = useRequireAuth();

  if (!auth) {
    return <Loader />;
  }

  return (
    <div className="row">
      <h2>List of favorite countries goes right here</h2>
      <p className="h3">Soon, maybe</p>
    </div>
  );
};
