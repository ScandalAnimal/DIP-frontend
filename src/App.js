import React from 'react';
// import CountriesContainer from './components/CountriesContainer';
// import Demo1Container from './components/Demo1Container';
// import MaterialComponent from './components/MaterialComponent';
// import Dashboard from './components/dashboard/Dashboard';
import CssBaseline from '@material-ui/core/CssBaseline';
import APIHookTest from './components/APIHookTest';

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline /> {/* removes browser-wise margins and paddings and more */}
      <APIHookTest />
      {/*<Dashboard />*/}
      {/*<Demo1Container />*/}
      {/*<CountriesContainer />*/}
      {/*<MaterialComponent />*/}
    </React.Fragment>
  );
};

export default App;
