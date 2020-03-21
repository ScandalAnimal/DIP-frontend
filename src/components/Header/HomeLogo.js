import { Link, useParams } from 'react-router-dom';
import { WrapperContext } from '../../Wrapper';
import React, { useContext } from 'react';
import logo from '../../assets/images/logoNew.png';

const HomeLogo = () => {
  const context = useContext(WrapperContext);
  const params = useParams();
  const path = context.teamId === null ? '/' : '/home';
  return (
    <Link to={`/${params.langId}${path}`}>
      <img src={logo} alt='App logo' width={175} />
    </Link>
  );
};

export default HomeLogo;
