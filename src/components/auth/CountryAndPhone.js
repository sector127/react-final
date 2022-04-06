import { useState, useEffect } from 'react';

import { getCountries } from '../../api/rest.service';
import { useAsync } from '../../hooks';

export const CountryAndPhone = ({ country }) => {
  const [currentCountry, setCurrentCountry] = useState(country);
  const [selectedCountry, setSelectedCountry] = useState();
  const [phoneIndex, setPhoneIndex] = useState('+995 ');
  const { execute, status, error, data } = useAsync(getCountries, false);
  console.log('selected country', selectedCountry);

  useEffect(() => {
    execute(currentCountry);
  }, [currentCountry, execute]);

  const searchSelectedCountry =
    data &&
    data.find((obj) => {
      if (obj.name.common === selectedCountry) {
        return true;
      }
      return false;
    });
  console.log('searchSelectedCountry', searchSelectedCountry);

  return (
    <>
      <label htmlFor="country-select" className="form-label">
        Select Country
      </label>
      <select
        id="country-select"
        className="form-select col-12"
        value={selectedCountry}
        onChange={(e) => {
          setSelectedCountry(e.target.value);
        }}
      >
        <option defaultValue>------------</option>
        {data &&
          data
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
            .map((country) => {
              return (
                <option key={+country.ccn3} value={country.name.cca3}>
                  {country.name.common}
                </option>
              );
            })}
      </select>
      {searchSelectedCountry && (
        <label htmlFor="phone" className="form-label">
          Phone number
        </label>
      )}
      <div className="col-12 d-flex justify-content-between align-items-center mb-2">
        {searchSelectedCountry && (
          <img
            src={searchSelectedCountry.flags.svg}
            alt={searchSelectedCountry.name.common}
            style={{ width: '25px', height: '16px' }}
          />
        )}
        {searchSelectedCountry && (
          <div className="d-flex">
            <span className="col-2 ms-2">
              <input
                className="form-control"
                id="phone_index"
                type="text"
                value={
                  searchSelectedCountry &&
                  searchSelectedCountry.idd.root.toString() +
                    (searchSelectedCountry.idd.suffixes.length > 1
                      ? ' '
                      : searchSelectedCountry.idd.suffixes[0] + ' ')
                }
                readOnly
              />
            </span>
            <input
              className="form-control ms-2"
              id="phone"
              type="text"
              defaultValue=""
              onChange={(e) => e.target.value}
            />
          </div>
        )}
      </div>
    </>
  );
};
