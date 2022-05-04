import { Loader, Button } from '../../atoms';
import { useRequireAuth } from '../../hooks';
import { useFavored } from '../../providers/CountryProvider/CountryProvider';
export const FavoriteCountries = ({ country }) => {
  const auth = useRequireAuth();
  const { countryLikes, likeCountry, unLikeCountry, favored } = useFavored();

  if (!auth) {
    return <Loader />;
  }

  console.log(Object.entries(countryLikes.countries));
  const handleTotal = () => {
    return (countryLikes.totalLiked = countryLikes.totalLiked - 1);
  };

  return (
    <div className="col-12 d-flex justify-content-between flex-wrap">
      {Object.entries(countryLikes.countries).map(([countryId, favored]) => {
        return (
          <div className="country-card-3" style={{ width: '18rem' }} key={countryId}>
            <div className="background-block">
              <img src={favored.image} className="background" alt={favored.name} />
            </div>
            <div className="card-content">
              <h2 className="card-title">{favored.name}</h2>
              <p className="card-text">
                <small>Capital: </small>
                {favored.capital}
              </p>
              <div className="icon-block">
                <Button
                  className="btn btn-danger"
                  text="🤍"
                  onClick={() => {
                    unLikeCountry(countryId);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
