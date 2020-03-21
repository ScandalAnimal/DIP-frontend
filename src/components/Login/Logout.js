import { Link, useParams } from 'react-router-dom';
import { WrapperContext } from '../../Wrapper';
import React, { useContext } from 'react';

function Logout() {
  const context = useContext(WrapperContext);
  const params = useParams();

  return (
    <div className='header-link' onClick={() => context.setTeamId(null)}>
      <Link to={`/${params.langId}/`}>
        <span>Logout</span>
      </Link>
    </div>
  );
}

export default Logout;
