import { useState, useEffect } from "react";

/**
 * Run an async function and track { loading, data, error }. Re-runs when
 * `deps` change. Ignores results after unmount / dep change.
 */
export function useAsync(fn, deps) {
  const [state, setState] = useState({ loading: true, data: null, error: null });
  useEffect(() => {
    let alive = true;
    setState({ loading: true, data: null, error: null });
    Promise.resolve()
      .then(fn)
      .then(
        (data) => {
          if (alive) setState({ loading: false, data, error: null });
        },
        (error) => {
          if (alive) setState({ loading: false, data: null, error });
        }
      );
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}
