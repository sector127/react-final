import { createContext, useContext } from 'react';

import { useLocalStorage } from '../../hooks';

export const CountryContext = createContext({
  totalLiked: 0,
});
CountryContext.displayName = 'CountryContext';

export const CountryProvider = ({ children }) => {
  const [countryLikes, setCountryLiked] = useLocalStorage('kountriez-app', {
    totalLiked: 0,
    countries: {},
  });
  const likeCountry = (country) => {
    setCountryLiked((prev) => {
      console.log(country);
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
            [country.ccn3]: {
              like: true,
              image: country.flags.svg,
              name: country.name.common,
              capital: country.capital[0],
            },
          },
        };
    });
    console.log(country);
  };

  const unLikeCountry = (id) => {
    setCountryLiked((prev) => {
      const favCountry = { ...prev.countries };
      delete favCountry[id];
      return {
        ...prev,
        totalLiked: prev.totalLiked - 1,
        countries: {
          ...favCountry,
        },
      };
    });
  };

  return (
    <CountryContext.Provider
      value={{
        countryLikes,
        likeCountry,
        unLikeCountry,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useFavored = () => {
  const favored = useContext(CountryContext);
  if (!favored) {
    throw SyntaxError('CartProvider is not defined');
  }

  return favored;
};
