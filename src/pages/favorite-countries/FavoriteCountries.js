import { useState, useEffect } from 'react';

import { getCountries } from '../../api/rest.service';
import { Loader } from '../../atoms';
import { useRequireAuth, useAsync } from '../../hooks';

export const FavoriteCountries = ({ country = 'all' }) => {
  const auth = useRequireAuth();

  if (!auth) {
    return <Loader />;
  }

  return (
    <div className="col-12 mx-auto flex-colum">
      <h2>Soon</h2>
    </div>
  );
};
