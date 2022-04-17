import { createContext, useState } from 'react';

export const CountryContext = createContext({
  totalLiked: 0,
});
CountryContext.displayName = 'CountryContext';

export const CountryProvider = ({ children }) => {
  const [countryLikes, setCountryLiked] = useState({
    totalLiked: 0,
    countries: {},
  });
  const likeCountry = (country) => {
    setCountryLiked((prev) => {
      if (prev.countries[country.ccn3]) {
        const favCountry = { ...prev.countries };
        delete favCountry[country.ccn3];
        return {
          ...prev,
          totalLiked: prev.totalLiked - 1,
          countries: {
            ...favCountry,
          },
        };
      } else
        return {
          ...prev,
          totalLiked: prev.totalLiked + 1,
          countries: {
            ...prev.countries,
            [country.ccn3]: { like: true },
          },
        };
    });
    console.log(country);
  };

  return (
    <CountryContext.Provider
      value={{
        countryLikes,
        likeCountry,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};
