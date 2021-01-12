import React from 'react';
import DashboardContainer from './components/pages/Dashboard/DashboardContainer';
import Signup from './components/pages/Signup/Signup';
import Login from './components/pages/Login/Login';
import { Route, Switch } from 'react-router-dom';
import { ProvideAuth } from './routes/useAuth';
import PrivateRoute from './routes/PrivateRoute';
import MainNav from './components/pages/MainNav/MainNav';

const App = () => {
  return (
    <ProvideAuth>
      <MainNav />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/signup">
          <Signup />
        </Route>

        <PrivateRoute exact path="/">
          <DashboardContainer />
        </PrivateRoute>
      </Switch>
    </ProvideAuth>
  );
};

export default App;
