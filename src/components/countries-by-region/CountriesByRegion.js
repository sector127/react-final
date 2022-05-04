import { useEffect, useState, useContext } from 'react';

import { CountryContext } from '../../providers/CountryProvider';
import { useAsync, useDebounce } from '../../hooks';
import { Button, Loader, TextInput } from '../../atoms';
import { REGIONS } from '../../utils/constants';
import { getCountriesByRegionName } from '../../api/rest.service';

import './CountryByRegion.css';

export const CountiesByRegion = ({ region = 'Europe' }) => {
  const [currentRegion, setCurrentRegion] = useState(region);
  const { execute, status, error, data } = useAsync(getCountriesByRegionName, false);
  const [sortType, setSortType] = useState();
  const [result, setResult] = useState(data && data.slice());
  const [filterTerm, setFilterTerm] = useState(result);
  const pausedSearch = useDebounce(filterTerm, 400);

  useEffect(() => {
    execute(currentRegion);
  }, [currentRegion, execute]);

  useEffect(() => {
    if (pausedSearch) {
      const dataSearch =
        data &&
        data.filter((el) => el.name.common.toLowerCase().includes(pausedSearch.toLowerCase()));
      setResult(dataSearch);
    } else {
      setResult(data && data.slice());
    }
  }, [pausedSearch, data]);

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
        >
          {currentRegion === item && status === 'pending' && (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </>
          )}
          {item}
        </Button>
      );
    });
  };
  const { countryLikes, likeCountry } = useContext(CountryContext);
  const renderCountries = () => {
    return (
      result &&
      result
        .sort((a, b) => b[sortType] - a[sortType])
        .map((country) => {
          return (
            <div className="col-3 d-flex justify-content-between mb-4" key={country.name.common}>
              <div className="card country-card-3" style={{ width: '18rem' }}>
                <div className="background-block">
                  <img src={country.flags.svg} alt={country.name.common} className="background" />
                </div>
                <div className="country-thumb-block">
                  <img src={country.coatOfArms.svg} alt={country.cca3} className="country" />
                </div>
                <div className="card-content">
                  <h2>
                    {country.name.common}
                    <small>Capital: {country.capital ? country.capital[0] : ''}</small>
                  </h2>
                  <p className="mb-0">
                    <small>
                      Population:
                      {country.population.toLocaleString()}
                    </small>
                  </p>
                  <p className="mb-0">
                    <small>
                      Area:
                      {country.area.toLocaleString()}
                    </small>
                  </p>
                  <div className="icon-block">
                    <a href={country.maps.googleMaps} target="_blank">
                      <i className="fas fa-map-marker"></i>
                    </a>
                    <a
                      className="btn"
                      onClick={() => {
                        likeCountry(country);
                      }}
                    >
                      {country.ccn3 in countryLikes.countries ? (
                        <i className="fas fa-heart" style={{ color: '	#FF0000' }}></i>
                      ) : (
                        <i className="far fa-heart"></i>
                      )}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })
    );
  };
  const handleFilterChange = ({ target }) => {
    setFilterTerm(target.value);
  };

  return (
    <div className="row">
      <div className="d-flex justify-content-center align-items-center row col-12 mb-3">
        <h2 className="text-muted col-4">
          Selected region: <span className="text-primary">{currentRegion}</span>
        </h2>
        <div className="col-2">
          <TextInput
            defaultValue={filterTerm}
            onChange={handleFilterChange}
            placeholder="ძიება..."
          />
        </div>
        <div className="col-2">
          <select className="form-select" onChange={(e) => setSortType(e.target.value)}>
            <option defaultValue="sort">Sort by</option>
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
