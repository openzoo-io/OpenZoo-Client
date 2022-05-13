import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { connector } = useWeb3React();
  return (
    <Route
      {...restOfProps}
      render={props =>
        connector ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;
