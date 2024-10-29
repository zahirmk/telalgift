import React, { createContext, useState } from 'react';

// Create the Dashboard context
export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [giftCounts, setGiftCounts] = useState([]);

  return (
    <DashboardContext.Provider value={{ giftCounts, setGiftCounts }}>
      {children}
    </DashboardContext.Provider>
  );
};
