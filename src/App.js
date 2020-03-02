import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Redirect} from 'react-router';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login fakeLogging={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/optimize" isAuth={isAuthenticated}>
          OPTIMIZE
        </ProtectedRoute>
        <ProtectedRoute path="/" isAuth={isAuthenticated}>
          <Dashboard fakeLogging={setAuthenticated} />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
};

function ProtectedRoute({isAuth, children, ...rest}) {
  return (
    <Route
      {...rest}
      render={({location}) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: location},
            }}
          />
        )
      }
    />
  );
}

export default App;
