import { useEffect } from 'react';

import { useRequireAuth } from '../../hooks';

import { Loader } from '../../atoms';
import HomeContent from './HomeContent';
import './home.css';

export const Home = (props) => {
  const auth = useRequireAuth();

  if (!auth) {
    return <Loader />;
  }
  return (
    <div className="col-12 my-3">
      <HomeContent />
      <HomeContent />
    </div>
  );
};
