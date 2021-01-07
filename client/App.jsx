import React, { useState } from 'react';
import Dashboard from '../client/components/Dashboard';
import Signup from '../client/components/Signup';
import Login from '../client/components/Login';
import Step from './components/Steps';
import { Route, Switch, Link, BrowserRouter } from 'react-router-dom';

export const UserContext = React.createContext();

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

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/dashboard">
            <Dashboard />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>

          <Route exact path="/application/:id/step">
            <Step />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
