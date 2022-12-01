import React, { createContext, useReducer } from 'react';

const init = {};

const logic = (state, action) => {
  switch (action.type) {
    case 'setCrtDot':
      return { ...state, poist: action.payload };
    default:
      return state;
  }
};

const Context = createContext(init);

const ContextProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(logic, init);

  return (
    <>
      <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
    </>
  );
};

export { ContextProvider, Context };
