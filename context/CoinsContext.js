"use client"
import React, { createContext, useContext, useState } from 'react';

const CoinsContext = createContext(undefined);

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState(null);

  return (
    <CoinsContext.Provider value={{ coins, setCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (!context) {
    throw new Error('useCoins must be used within a CoinsProvider');
  }
  return context;
};
