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
    <div className="col-12 row d-flex justify-content-between flex-wrap">
      {Object.entries(countryLikes.countries).map(([countryId, favored]) => {
        return (
          <div className="card mb-2" style={{ width: '18rem' }} key={countryId}>
            <img src={favored.image} className="card-img-top" alt={favored.name} />
            <div className="card-body">
              <h5 className="card-title">{favored.name}</h5>
              <p className="card-text">
                <span className="fw-bold">Capital: </span>
                {favored.capital}
              </p>
              <div className="col-12 p-3 d-flex justify-content-between">
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
