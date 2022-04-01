import { useEffect, useState } from 'react';

export const useDebounce = (value, delay) => {
  const [pausedValue, setPausedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setPausedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return pausedValue;
};
