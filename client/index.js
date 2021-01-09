import React, { createContext, useState } from 'react';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
<<<<<<< Updated upstream
import './style/style.css';
=======
import '../client/stylesheets/style.css';
import { AuthProvider } from '../client/state'

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ id: null });

  const saveUser = (id) => {
    console.log('saveUser in UserProvider ===> ', id);
    setCurrentUser({ id });
  };

  return (
    <UserContext.Provider value={{ user: currentUser, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};

const container = document.getElementById('app');
>>>>>>> Stashed changes

render(
  <UserProvider>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </UserProvider>,
  container
);

// Attach root container
// debugContextDevtool(container, {
  // debugReducer: false,
// });
