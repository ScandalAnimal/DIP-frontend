import { WrapperContext } from '../../Wrapper';
import ChangeLanguage from './ChangeLanguage';
import HamburgerIcon from './HamburgerIcon';
import HeaderLink from './HeaderLink';
import HomeLogo from './HomeLogo';
import Logout from '../Login/Logout';
import React, { useContext, useState } from 'react';

const Header = () => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const context = useContext(WrapperContext);

  const toggleMobileMenu = () => {
    setMobileMenuOpened(!mobileMenuOpened);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpened(false);
  };

  const mobileMenuClass = mobileMenuOpened ? 'nav-hidden--opened' : 'nav-hidden';
  return (
    <header className='header'>
      <div className='container'>
        <div className='row justify-content-space-between'>
          <div className='col-auto d-flex align-items-center' onClick={closeMobileMenu}>
            <HomeLogo />
          </div>
          {context.teamId !== null && (
            <>
              <div className='col justify-content-end nav-hamburger'>
                <HamburgerIcon action={toggleMobileMenu} />
              </div>
              <div className='col-auto align-items-center nav-link'>
                <HeaderLink title={'Optimize'} url={'optimize'} />
              </div>
              <div className='col-auto align-items-center nav-link'>
                <HeaderLink title={'Fixtures'} url={'fixtures'} />
              </div>
              <div className='col-auto align-items-center nav-link'>
                <HeaderLink title={'Injuries & Suspensions'} url={'injuries'} />
              </div>
              <div className='col align-items-center justify-content-end nav-link'>
                <ChangeLanguage />
              </div>
              <div className='col-auto align-items-center justify-content-end nav-link'>
                <Logout />
              </div>
            </>
          )}
        </div>
        <div className={`row justify-content-space-between ` + mobileMenuClass}>
          <div className='col-auto align-items-center'>
            <HeaderLink title={'Optimize'} url={'optimize'} action={closeMobileMenu} />
          </div>
          <div className='col-auto align-items-center'>
            <HeaderLink title={'Fixtures'} url={'fixtures'} action={closeMobileMenu} />
          </div>
          <div className='col-auto align-items-center'>
            <HeaderLink
              title={'Injuries & Suspensions'}
              url={'injuries'}
              action={closeMobileMenu}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
