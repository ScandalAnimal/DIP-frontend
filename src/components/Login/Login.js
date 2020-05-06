import { Form } from 'react-bootstrap';
import { login, manualTeam } from '../../reducers/appActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../Button/Button';
import React, { useEffect, useState } from 'react';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginError = useSelector(state => state.app.loginError);

  const params = useParams();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleChangeEmail = e => {
    setInputEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setInputPassword(e.target.value);
  };

  function handleManualInput(e) {
    e.preventDefault();
    manualTeam(dispatch, history, params);
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(dispatch, history, params, inputEmail, inputPassword);
  }

  useEffect(() => {
    dispatch({
      type: 'CLEAR',
    });
  }, [dispatch]);

  return (
    <div className='header-link'>
      <Form>
        <Form.Group controlId='formEmail' className={'login-input'}>
          {loginError && (
            <Form.Label className='error-text'>Invalid credentials, try again.</Form.Label>
          )}
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
          <br />
          If you do not wish to input your credentials, you can select your team manually by
          clicking the button below.
          <br />
          (This way we must use current player prices, not original player purchase prices at the
          time of your buying.)
        </div>
        <div className='login-buttons'>
          <Button variant='lightPrimary' text='Submit' type='submit' onClick={handleSubmit} />
          <Button
            variant='lightPrimary'
            text='Input team manually'
            type='submit'
            onClick={handleManualInput}
          />
        </div>
      </Form>
    </div>
  );
}

export default Login;
