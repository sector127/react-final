import { useForm } from 'react-hook-form';
import { useAuthProvider } from '../../providers/AuthProvider';

import { LOGIN_PATH, REGISTER_PATH, PROFILE_PATH } from '../../utils';
import { Button, Form } from '../../atoms';

export const RegisterForm = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const { register: signUp } = useAuthProvider();

  const onSubmit = (signUpData) => {
    signUp(signUpData);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign up</h2>
      <hr />

      <div className="col-12 m-auto">
        <div className="mb-3">
          <label htmlFor="first-name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            className="form-control"
            {...register('First name', { required: false, maxLength: 80 })}
          />
          <label htmlFor="last-name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            className="form-control"
            {...register('Last name', { required: false, maxLength: 100 })}
          />
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${
              errors.email ? 'is-invalid' : watch('email') ? 'is-valid' : ''
            }`}
            id="email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <div id="emailHelp" className="form-text text-danger">
              {errors.email.message}
            </div>
          )}
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`form-control ${
              errors.password ? 'is-invalid' : watch('password') ? 'is-valid' : ''
            }`}
            {...register('password', {
              required: true,
              validate: (value) => value.length > 5,
            })}
          />
          {errors.password && (
            <div id="passwordHelp" className="form-text text-danger">
              Password is required
            </div>
          )}
          <label htmlFor="confirm_password" className="form-label">
            Confirm Password
          </label>
          <input
            className={`form-control ${
              errors.cpassword ? 'is-invalid' : watch('password') ? 'is-valid' : ''
            }`}
            id="confirm_password"
            type="password"
            {...register('cpassword', {
              required: true,
              validate: (value) => {
                const { password } = getValues();
                return password === value || 'Passwords should match!';
              },
            })}
          />
          {errors.cpassword && (
            <div id="passwordHelp" className="form-text text-danger">
              Passwords should match!
            </div>
          )}
        </div>

        <Button type="submit" className="btn btn-primary">
          Sign Up
        </Button>
      </div>
      <hr />
      <div className="col-12">
        <span>
          <h6>
            Have an Account? 👉{' '}
            <a href={LOGIN_PATH} className="link-primary">
              Sign in
            </a>
          </h6>
        </span>
        <p className="text-muted">
          <a href="#" className="link-primary">
            Forgot Password?
          </a>
        </p>
      </div>
    </Form>
  );
};
