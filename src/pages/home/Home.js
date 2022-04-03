import { useEffect } from 'react';

import { useRequireAuth } from '../../hooks';

import { Loader } from '../../atoms';
import HomeContent from './HomeContent';
import { CountiesByRegion } from '../../components/countries-by-region/CountriesByRegion';
import './home.css';

export const Home = (props) => {
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
