import { LoginForm } from '../../components/auth';

import './login.css';

export const Login = (props) => {
  return (
    <div className="row main-container">
      <div className="col-8"></div>
      <div className="col-4 d-flex justify-content-center align-items-center shadow-lg bg-white">
        <LoginForm />
      </div>
    </div>
  );
};
