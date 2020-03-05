import React from 'react';
import ReactLoading from 'react-loading';

export default function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flex: 'auto' }}>
      <ReactLoading type='bars' color='#a9c8c0' />
    </div>
  );
}
