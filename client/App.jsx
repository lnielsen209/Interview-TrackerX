import React from 'react';
import DashboardContainer from './components/DashboardContainer';
import Signup from '../client/components/Signup';
import Login from '../client/components/Login';
import { Route, Switch } from 'react-router-dom';
import { ProvideAuth } from './routes/useAuth';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <ProvideAuth>
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
      </Switch>
    </ProvideAuth>
  );
};

export default App;
