import { useState } from 'react';
import './collapsible.css';

export const Collapsible = ({ closedTitle, openedTitle, isOpen = false, children, className }) => {
  const [opened, setOpened] = useState(isOpen);
  return (
    <div className={`row box shadow p-3 my-3 ${className}`}>
      <h2
        style={{
          cursor: 'pointer',
        }}
        className="badge bg-primary fs-4"
        onClick={() => setOpened(!opened)}
      >
        {opened ? openedTitle : closedTitle}
      </h2>
      <div className={`col-12 collapsible-content ${opened ? 'opened' : ''}`}>
        {opened ? children : null}
      </div>
    </div>
  );
};
