import React from 'react';

const Footer = () => {
  return (
    <div className='d-flex flex-column'>
      <footer className='footer footer-bottom'>
        <div className='ml-auto'>
          <div>
            Created by: {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href='https://github.com/ScandalAnimal' target='_blank'>
              Maroš Vasilišin
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
