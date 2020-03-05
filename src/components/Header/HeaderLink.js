import { Link, useParams } from 'react-router-dom';
import React from 'react';

const HeaderLink = ({ title, url }) => {
  const params = useParams();

  return (
    <div className='header-link'>
      <Link to={`/${params.langId}/${url}`}>
        <span>{title}</span>
      </Link>
    </div>
  );
};

export default HeaderLink;
