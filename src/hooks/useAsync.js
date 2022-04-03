import { useCallback, useEffect, useState } from 'react';

export const useAsync = (asyncFn, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    (params) => {
      setStatus('panding');
      setData(null);
      setError(null);

      return asyncFn(params)
        .then((response) => {
          setData(response);
          setStatus('success');
        })
        .catch((error) => {
          setError(error);
          setStatus('error');
        });
    },
    [asyncFn]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return {
    execute,
    error,
    data,
    status,
  };
};
