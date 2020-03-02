import React, {useCallback} from 'react';
// import Navigation from '../../components/Navigation/Navigation';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardActions, CardContent, Button, Typography, Input} from '@material-ui/core';

import {useHistory, useLocation} from 'react-router-dom';

const useStyles = makeStyles({
  loginContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: '0 1 auto',
  },
  cardContent: {
    display: 'flex',
    flex: '1 0 100%',
    flexFlow: 'column wrap',
  },
  cardActions: {
    display: 'flex',
    flex: '1 0 auto',
    justifyContent: 'center',
  },
  input: {
    alignSelf: 'center',
    marginBottom: '20px',
  },
});

function Login({fakeLogging}) {
  let history = useHistory();
  let location = useLocation();

  let {from} = location.state || {from: {pathname: '/'}};

  const submitLogin = useCallback(() => {
    fakeLogging(true);
    history.replace(from);
  }, [fakeLogging, from, history]);

  const classes = useStyles();
  return (
    <div className={classes.loginContent}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom align="center" color="textPrimary">
            Please, log in!
          </Typography>
          <Input
            type="email"
            id="login"
            className={classes.input}
            placeholder="Your email adress"
          />
          <Input type="password" id="password" className={classes.input} placeholder="Password" />
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button id="submitLogin" size="large" color="default" onClick={submitLogin}>
            Log in
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Login;
