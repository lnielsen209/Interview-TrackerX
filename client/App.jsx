import React from 'react';
import DashboardContainer from './components/pages/Dashboard/DashboardContainer';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Signup from './components/pages/Signup/Signup';
import Signin from './components/pages/Signin/Signin';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path='/signin'>
          <Signin />
        </Route>

        <Route exact path='/signup'>
          <Signup />
        </Route>

        <PrivateRoute exact path='/'>
          <DashboardContainer />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default App;
