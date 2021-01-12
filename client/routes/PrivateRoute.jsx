import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './useAuth';

const PrivateRoute = ({ children, ...rest }) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
