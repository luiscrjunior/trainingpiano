import React, { createContext, useReducer } from 'react';
import Reducer from './reducer';

import defaultValues from './defaultValues';

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, defaultValues);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext(defaultValues);
export default Store;
