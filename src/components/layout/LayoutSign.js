import { Outlet } from 'react-router-dom';

import './LayoutSign.css';

export const LayoutSign = () => {
  return (
    <div className="row main-container">
      <div className="col-8">
        <div className="h1 p-5 text-light">
          <a className="text-light text-decoration-none" href="/">
            {'{ kountriez }'}
          </a>
        </div>
      </div>
      <div className="col-4 d-flex justify-content-center align-items-center shadow-lg bg-white">
        <Outlet />
      </div>
    </div>
  );
};
