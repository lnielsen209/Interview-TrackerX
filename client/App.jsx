import React from 'react';
import DashboardContainer from './components/pages/Dashboard/DashboardContainer';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Signup from './components/pages/Signup/Signup';
import Login from './components/pages/Login/Login';
import MainNav from './components/pages/MainNav/MainNav';

const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
