import React, { useContext, createContext, useState } from 'react';

const authContext = createContext();

// Option 1 save user data in state
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

  // console.log('user in useAuth ===> ', user);
  return { user, login, signup, signout };
};

// // Option 2 save user data in localStorage
// const useProvideAuth = () => {
//   const user = JSON.parse(localStorage.getItem('user')) || {
//     id: null,
//     email: null,
//     isAuthenticated: false,
//   };

//   const login = (id, email, cb) => {
//     const user = {
//       id,
//       email,
//       isAuthenticated: true,
//     };
//     localStorage.setItem('user', JSON.stringify(user));
//     cb();
//   };

//   const signup = (id, email, cb) => {
//     const user = {
//       id,
//       email,
//       isAuthenticated: true,
//     };
//     localStorage.setItem('user', JSON.stringify(user));
//     cb();
//   };

//   const signout = (cb) => {
//     localStorage.removeItem('user');
//     cb();
//   };

//   // console.log('user in useAuth ===> ', user);
//   return { user, login, signup, signout };
// };

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
