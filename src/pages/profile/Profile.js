import PropTypes from 'prop-types';

import { Task } from '../../components/Task';

export const Profile = ({ title }) => {
  return (
    <div className="row p2">
      <Task />
      <h3>{title}</h3>
    </div>
  );
};

Profile.propTypes = {
  title: PropTypes.string.isRequired,
};
