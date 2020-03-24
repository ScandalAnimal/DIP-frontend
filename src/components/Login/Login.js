import { Form } from 'react-bootstrap';
import { getTeamData } from '../../reducers/appActions';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../Button/Button';
import React, { useState } from 'react';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const params = useParams();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleChangeEmail = e => {
    setInputEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setInputPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    getTeamData(dispatch, history, params, inputEmail, inputPassword);
  }

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
        <Button variant='lightPrimary' text='Submit' type='submit' onClick={handleSubmit} />
      </Form>
    </div>
  );
}

export default Login;
