import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './ApiAuth';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() && isAuth().user.role === 1 ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

export default AdminRoute;
