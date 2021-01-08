import React, { createContext, useContext, useReducer } from 'react';
import { AuthReducer, authInitialState } from '../reducers';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, authInitialState);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};