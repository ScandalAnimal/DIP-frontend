import { Link } from 'react-router-dom';
import React from 'react';

const ChangeLanguage = () => {
  return (
    <div className='language-chooser'>
      <Link to={location => `/cs/${location.pathname.substring(4)}`}>CZ</Link> /{' '}
      <Link to={location => `/en/${location.pathname.substring(4)}`}>EN</Link>
    </div>
  );
};

export default ChangeLanguage;
