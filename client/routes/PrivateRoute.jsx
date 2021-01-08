import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  console.log('location in PrivateRoute ===> ', location);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.user.isAuthenicated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
