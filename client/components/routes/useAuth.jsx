import React, { useContext, createContext, useState, useEffect } from 'react';

const authContext = createContext();

const useProvideAuth = () => {
  const [user, setUser] = useState({
    id: null,
    isAuthenticated: false,
  });
  const login = (id, cb) => {
    setUser({
      ...user,
      id,
      isAuthenticated: true,
    });
    cb();
  };

  const signup = (id, cb) => {
    setUser({
      ...user,
      id,
      isAuthenticated: true,
    });
    cb();
  };

  const signout = (cb) => {
    setUser({
      ...user,
      userId: null,
      isAuthenticated: false,
    });
    cb();
  };
  return { user, login, signup, signout};
};

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
