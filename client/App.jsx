import React from 'react';
import DashboardContainer from './components/DashboardContainer';
import Signup from '../client/components/Signup';
import Login from '../client/components/Login';
<<<<<<< Updated upstream
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
=======
import Step from './components/StepsContainer';
import NotFoundPage from './components/NotFoundPage';
import { Switch } from 'react-router-dom';
import AppRoute from './components/AppRoute';

const App = () => {
  return (
    <Switch>
      <AppRoute path='/login'>
        <Login />
      </AppRoute>
      <AppRoute path='/signup'>
        <Signup />
      </AppRoute>
      <AppRoute path='/application/:id/step'>
        <Step />
      </AppRoute>
      <AppRoute isPrivate exact path='/'>
        <DashboardContainer />
      </AppRoute>
      <AppRoute component={NotFoundPage} />
    </Switch>
>>>>>>> Stashed changes
  );
};

export default App;
