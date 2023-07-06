import React, { createContext, useContext, useReducer } from 'react';

export const DatalayerContext = createContext();

export const DatalayerProvider = ({ initialState, reducer, children }) => (
  <DatalayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DatalayerContext.Provider>
);

export const useDatalayerValue = () => useContext(DatalayerContext);
