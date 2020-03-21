import { Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { WrapperContext } from '../../Wrapper';
import Button from '../Button/Button';
import React, { useContext, useState } from 'react';
import loginService from '../../service/loginService';
import playerService from '../../service/playerService';

function Login() {
  const context = useContext(WrapperContext);

  const params = useParams();
  // const { setTeamId } = context;
  //
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleChangeEmail = e => {
    setInputEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setInputPassword(e.target.value);
  };

  const handleSubmit = () => {
    console.log('submit');
    loginService.getTeamData(inputEmail, inputPassword);
    playerService.getPlayers();
    // setTeamId(inputTeamId);
  };

  return (
    <div className='header-link'>
      <Form>
        <Form.Group controlId='formEmail' className={'login-input'}>
          <Form.Label>Insert your FPL email</Form.Label>
          <Form.Control type='email' value={inputEmail} onChange={e => handleChangeEmail(e)} />
          <Form.Text className='text-muted'>{`Use the same email that you use for the FPL.`}</Form.Text>
        </Form.Group>
        <Form.Group controlId='formPassword' className={'login-input'}>
          <Form.Label>Insert your FPL password</Form.Label>
          <Form.Control
            type='password'
            value={inputPassword}
            onChange={e => handleChangePassword(e)}
          />
          <Form.Text className='text-muted'>{`Use your FPL password`}</Form.Text>
        </Form.Group>
        <div className='login-disclaimer'>
          We do not store any personal data or passwords, these are used just for fetching data from
          the FPL API.
        </div>
        <Link to={`/${params.langId}/home`}>
          <Button variant='lightPrimary' text='Submit' type='submit' onClick={handleSubmit} />
        </Link>
      </Form>
    </div>
  );
}

export default Login;
