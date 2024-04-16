
import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [fname, setFname] = useState('');

  return (
    <UserContext.Provider value={{ fname, setFname }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
