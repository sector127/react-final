import { useRequireAuth } from '../../hooks';

import { Loader } from '../../atoms';
import { CountiesByRegion } from '../../components/countries-by-region/CountriesByRegion';

export const Countries = (props) => {
  const auth = useRequireAuth();

  if (!auth) {
    return <Loader />;
  }
  return (
    <div className="col-12 my-3">
      <CountiesByRegion />
    </div>
  );
};
