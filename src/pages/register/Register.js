import { RegisterForm } from '../../components/auth';
import './register.css';

export const Register = (props) => {
  return (
    <div className="row main-container">
      <div className="col-8"></div>
      <div className="col-4 d-flex justify-content-center align-items-center shadow-lg bg-white">
        <RegisterForm />
      </div>
    </div>
  );
};
