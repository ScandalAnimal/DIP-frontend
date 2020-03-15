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
import React from 'react';
import Wrapper from './Wrapper';
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
              <Route exact path={`${match.path}/`} children={<Homepage />} />
              <Route path={`${match.path}/fixtures`} children={<Fixtures />} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Wrapper>
    </IntlProvider>
  );
};

export default Root;
