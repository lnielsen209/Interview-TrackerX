import React, { useState } from 'react';
import DashboardContainer from './components/DashboardContainer';
import Signup from '../client/components/Signup';
import Login from '../client/components/Login';
import StepsContainer from './components/StepsContainer';
import { Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import { ProvideAuth } from './components/routes/useAuth';
import PrivateRoute from './components/routes/PrivateRoute';

// // user provider
// export const UserContext = React.createContext();

// const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState({ id: null });

//   const saveUser = (id) => {
//     console.log('saveUser in UserProvider ===> ', id);
//     setCurrentUser({ id });
//   };

//   return (
//     <UserContext.Provider value={{ user: currentUser, saveUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

const App = () => {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>

          <PrivateRoute exact path="/dashboard">
            <DashboardContainer />
          </PrivateRoute>

          <PrivateRoute exact path="/application/:id/step">
            <StepsContainer />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
};

export default App;
