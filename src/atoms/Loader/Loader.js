import PropTypes from 'prop-types';
export const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
      <span className="visually-hidden">{message}</span>
    </div>
  );
};

Loader.propTypes = {
  message: PropTypes.string,
};
