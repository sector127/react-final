import { useForm } from 'react-hook-form';
import { Form, Button } from '../../atoms';

import { useAuthProvider } from '../../providers/AuthProvider';
import { LOGIN_PATH, REGISTER_PATH, PROFILE_PATH } from '../../utils';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const { login } = useAuthProvider();

  const onSubmit = (loginData) => {
    login(loginData);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign In</h2>
      <hr />
      <div className="col-12 m-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address - "eve.holt@reqres.in"
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
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password - "cityslicka"
          </label>
          <input
            type="password"
            className={`form-control ${
              errors.password ? 'is-invalid' : watch('password') ? 'is-valid' : ''
            }`}
            id="password"
            {...register('password', {
              required: true,
              validate: (value) => value.length > 5,
            })}
          />
          {errors.password && (
            <div id="passwordHelp" className="form-text text-danger">
              Required
            </div>
          )}
        </div>

        <Button type="submit" className="btn btn-primary">
          Login
        </Button>
      </div>
      <hr />
      <div className="col-12">
        <span>
          <h6>
            New User? 👉{' '}
            <a href={REGISTER_PATH} className="link-primary">
              Sign Up
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
