import React, { useContext, createContext, useState, useEffect } from 'react';

const authContext = createContext();

const useProvideAuth = () => {
  const [user, setUser] = useState({
    id: null,
    email: null,
    isAuthenticated: false,
  });
  const login = (id, email, cb) => {
    setUser({
      ...user,
      id,
      email,
      isAuthenticated: true,
    });
    cb();
  };

  const signup = (id, email, cb) => {
    setUser({
      ...user,
      id,
      email,
      isAuthenticated: true,
    });
    cb();
  };

  const signout = (cb) => {
    setUser({
      id: null,
      email: null,
      isAuthenticated: false,
    });
    cb();
  };

  console.log('user in useAuth ===> ', user);
  return { user, login, signup, signout };
};

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
