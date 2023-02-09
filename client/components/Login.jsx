import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAppPage, setGlobalUser, setIsLoggedIn } from '../slices';

function Login(props) {
  const { appPage } = props;
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
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

  const handleChange = (event) => {
    console.log('username before click', username);
    if (event.target.id === 'username') setUsername(event.target.value);
    if (event.target.id === 'password') setPassword(event.target.value);
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

  return (
    <div className='loginWrapper'>
      <form onSubmit={handleSubmit} className='loginContainer'>
        <h1>Food Remedy</h1>
        <label htmlFor='username'>
          <b>Username</b>
          <input
            id='username'
            type='text'
            onChange={handleChange}
            placeholder='Enter Username'
            name='username'
            // required={appPage !== '/' ? false : true}
          />
        </label>

        <label htmlFor='password'>
          <b>Password</b>
          <input
            id='password'
            type='text'
            onChange={handleChange}
            placeholder='Enter Password'
            name='password'
            // required={appPage !== '/' ? false : true}
          />
        </label>

        <button type='submit' onClick={handleLogin}>
          LOGIN
        </button>
        {loginError ? <span>Username or Password Incorrect</span> : null}
        <hr></hr>
        <p>
          <b>Don't have an account?</b>
        </p>
        <button type='submit' onClick={handleSignup}>
          Sign Up With Alchemeal
        </button>
      </form>
    </div>
  );
}
export default Login;
