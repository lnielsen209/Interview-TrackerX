import React from 'react';
import DashboardContainer from './components/DashboardContainer';
import Signup from '../client/components/Signup';
import Login from '../client/components/Login';
import StepsContainer from './components/StepsContainer';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ProvideAuth } from './routes/useAuth';
import PrivateRoute from './routes/PrivateRoute';

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
