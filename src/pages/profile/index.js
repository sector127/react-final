import { withAuthProtection } from '../../hoc/withAuthProtection';
import { Profile } from './Profile';

export default withAuthProtection(Profile);
