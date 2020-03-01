import React from 'react';
// import CountriesContainer from './components/CountriesContainer';
// import Demo1Container from './components/Demo1Container';
// import MaterialComponent from './components/MaterialComponent';
import Dashboard from './components/dashboard/Dashboard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import APIHookTest from './components/APIHookTest';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          {/*<Dashboard />*/}
          <APIHookTest />
        </Route>
      </Switch>
    </Router>
    // <APIHookTest />
    // <Demo1Container />
    // <CountriesContainer />
    // <MaterialComponent />
  );
};

export default App;
