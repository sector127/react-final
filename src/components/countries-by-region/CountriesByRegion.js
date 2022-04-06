import { useEffect, useState } from 'react';

import { useAsync } from '../../hooks';
import { Button, Loader } from '../../atoms';
import { REGIONS } from '../../utils/constants';
import { getCountriesByRegionName } from '../../api/rest.service';

export const CountiesByRegion = ({ region = 'Europe' }) => {
  const [currentRegion, setCurrentRegion] = useState(region);
  const { execute, status, error, data } = useAsync(getCountriesByRegionName, false);
  const [sortType, setSortType] = useState('population');

  useEffect(() => {
    execute(currentRegion);
  }, [currentRegion, execute]);

  const renderRegions = () => {
    return REGIONS.map((item) => {
      return (
        <Button
          className="btn btn-outline-success"
          text={item}
          key={item}
          onClick={() => {
            setCurrentRegion(item);
          }}
        />
      );
    });
  };
  const renderCountries = () => {
    return (
      data &&
      data
        .sort((a, b) => b[sortType] - a[sortType])
        .map((country) => {
          return (
            <div className="card mb-2" style={{ width: '18rem' }} key={country.name.common}>
              <img src={country.flags.svg} className="card-img-top" alt={country.name.common} />
              <div className="card-body">
                <div className="col-12 d-flex justify-content-between">
                  <h5 className="card-title">{country.name.common}</h5>
                  <p className="card-text d-flex justify-content-between">
                    <img src={country.coatOfArms.svg} alt={country.cca3} width="30" />
                  </p>
                </div>
                {country.capital && (
                  <p className="card-text">
                    <span className="fw-bold">Capital: </span>
                    {country.capital[0]}
                  </p>
                )}
                <p className="cart-text">
                  <span className="fw-bold">Population: </span>{' '}
                  {country.population.toLocaleString()}
                </p>
                <p className="cart-text">
                  <span className="fw-bold">Area: </span> {country.area}
                </p>
              </div>
              <div className="col-12 p-3 d-flex justify-content-between">
                <a
                  href={country.maps.googleMaps}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Show on map
                </a>
                <Button className="btn btn-danger" text="Like" />
              </div>
            </div>
          );
        })
    );
  };

  return (
    <div className="row">
      <div className="d-flex align-items-center row col-12 mb-3">
        <h2 className="text-muted col-6">
          Selected region: <span className="text-primary">{currentRegion}</span>
        </h2>
        <div className="col-2">
          <select className="form-select" onChange={(e) => setSortType(e.target.value)}>
            <option value="population">Population</option>
            <option value="area">Area</option>
          </select>
        </div>
        <div className="btn-group text-muted col-4">{renderRegions()}</div>
      </div>
      <hr />
      <div className="row col-12">
        {status === 'idle' && <h3 className="text-warning">Please select a region</h3>}
        {status === 'error' && <h3 className="text-danger">{error}</h3>}
        {status === 'pending' && <Loader />}
        {status === 'success' && (
          <div className="d-flex justify-content-between flex-wrap">{renderCountries()}</div>
        )}
      </div>
    </div>
  );
};
