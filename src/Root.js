/* eslint-disable react/no-children-prop */
import 'react-toastify/dist/ReactToastify.css';
import { IntlProvider } from 'react-intl';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Fixtures from './components/Fixtures/Fixtures';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header.js';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import Optimize from './components/Optimize/Optimize';
import React, { useContext } from 'react';
import Wrapper, { WrapperContext } from './Wrapper';
import csTranslations from './translations/cs.json';
import enTranslations from './translations/en.json';

const translationsForUsersLocale = {
  en: enTranslations,
  cs: csTranslations,
};

const RedirectToLang = () => {
  return (
    <Redirect
      to={{
        pathname: '/cs',
      }}
    />
  );
};
const Root = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' children={<RedirectToLang />} />
          <Route path='/:langId' children={<DIPRoutes />} />
        </Switch>
      </div>
    </Router>
  );
};

const DIPRoutes = () => {
  const params = useParams();
  const match = useRouteMatch();
  const langId = params.langId;

  if (!['en', 'cs'].includes(langId)) {
    return <RedirectToLang />;
  }
  return (
    <IntlProvider locale={params.langId} messages={translationsForUsersLocale[params.langId]}>
      <ToastContainer />

      <Wrapper>
        <div className='position-relative'>
          <Header />
          <div className='container app-body'>
            <Switch>
              <Route exact path={`${match.path}/`} children={<Login />} />
              <ProtectedRoute path={`${match.path}/home`} children={<Homepage />} />
              <ProtectedRoute path={`${match.path}/fixtures`} children={<Fixtures />} />
              <ProtectedRoute path={`${match.path}/optimize`} children={<Optimize />} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Wrapper>
    </IntlProvider>
  );
};

function ProtectedRoute({ children, ...rest }) {
  const context = useContext(WrapperContext);
  const isAuth = context.teamId !== null;
  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
}

export default Root;
