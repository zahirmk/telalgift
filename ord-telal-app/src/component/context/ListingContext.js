import React, { createContext, useState } from 'react';

// Create the Listing context
export const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  const [listing, setlisting] = useState([]);

  return (
    <ListingContext.Provider value={{ listing, setlisting }}>
      {children}
    </ListingContext.Provider>
  );
};
