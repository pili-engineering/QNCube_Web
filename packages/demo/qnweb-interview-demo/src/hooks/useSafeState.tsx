import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
function useSafeState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

function useSafeState<S = undefined>(initialState?: S | (() => S)): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const mounted = useRef<boolean>(false);
  const [state, setState] = useState(initialState);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const setSafeState: Dispatch<SetStateAction<S | undefined>> = state => {
    if (mounted.current) {
      setState(state);
    }
  };
  return [
    state,
    setSafeState
  ];
}

export default useSafeState;