import { Link, useParams } from 'react-router-dom';
import ChangeLanguage from './ChangeLanguage';
import HeaderLink from './HeaderLink';
import React from 'react';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const params = useParams();

  return (
    <header className='header'>
      <div className='container'>
        <div className='row justify-content-space-between'>
          <div className='col-auto d-flex align-items-center'>
            <Link to={`/${params.langId}/`}>
              <img src={logo} alt='App logo' width={100} />
            </Link>
          </div>
          <div className='col-auto d-flex align-items-center'>
            <HeaderLink title={'Optimize'} url={'optimize'} />
          </div>
          <div className='col-auto d-flex align-items-center'>
            <HeaderLink title={'Fixtures'} url={'fixtures'} />
          </div>
          <div className='col-auto d-flex align-items-center'>
            <HeaderLink title={'Injuries & Suspensions'} url={'injuries'} />
          </div>
          <div className='col d-flex align-items-center justify-content-end'>
            <ChangeLanguage />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
