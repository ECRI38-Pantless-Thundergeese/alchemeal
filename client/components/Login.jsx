import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAppPage, setGlobalUser, setIsLoggedIn } from '../slices';
import TextBox from './TextBox';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

function Login(props) {
  const { appPage, isSignUp, handleUser, handlePassword, oAuth, oAuthHandler } =
    props;
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (isSignUp) return;

    console.log('checking if user already logged in...');
    fetch('/verify', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data !== undefined) {
          dispatch(setGlobalUser(data));
          dispatch(setIsLoggedIn(true));
          dispatch(setAppPage('/feature'));
        }
      })
      .catch((err) => {
        // console.log(err);
        // console.log('user not logged in returning to login.');
      });
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    dispatch(setAppPage('/signup'));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('username', data);
        dispatch(setGlobalUser(data));
        dispatch(setIsLoggedIn(true));
        dispatch(setAppPage('/feature'));
        setLoginError(false);
      })
      .catch((err) => {
        setLoginError(true);
        console.log('login error:', err);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
  }

  const inputFields = (
    <tb>
      <TextBox
        className='TextBox'
        labelClass='label'
        label='Username'
        name='userName'
        required={true}
        onChange={handleUser ? handleUser : handleUserNameChange}
      />
      <TextBox
        id='outlined-adornment-password'
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {showPassword ? (
                <VisibilityOff className='svg_icons' />
              ) : (
                <Visibility className='svg_icons' />
              )}
            </IconButton>
          </InputAdornment>
        }
        label='Password'
        onChange={handlePassword ? handlePassword : handlePasswordChange}
      />
    </tb>
  );

  if (appPage !== '/') {
    return inputFields;
  } else {
    return (
      <div className='loginWrapper'>
        <form onSubmit={handleSubmit} className='loginContainer'>
          <h1>AlcheMEal</h1>
          {inputFields}
          <button className='login' type='submit' onClick={handleLogin}>
            LOGIN
          </button>

          {oAuth ? (
            <div class='google-btn' onClick={oAuthHandler}>
              <div class='google-icon-wrapper'>
                <img
                  class='google-icon-svg'
                  src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                />
              </div>
              <p class='btn-text'>
                <b>Sign in with Google</b>
              </p>
            </div>
          ) : null}
          {loginError ? (
            <span style={{ color: 'red' }}>Username or Password Incorrect</span>
          ) : (
            <span style={{ color: 'white' }}>''</span>
          )}
          <div className='section-div'>
            <span className='divider'>Don't have an account?</span>
          </div>
          <button className='signup' type='submit' onClick={handleSignup}>
            SIGN UP
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
