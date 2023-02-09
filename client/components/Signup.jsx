import React, { useState } from 'react';
import Profile from './Profile';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoggedIn, setGlobalUser } from '../slices';

function Signup(props) {
  const { appPage } = props;
  const [signUpError, setSignUpError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleChange = (event) => {
    console.log('username before click', username);
    if (event.target.id === 'username') setUsername(event.target.value);
    if (event.target.id === 'password') setPassword(event.target.value);
  };

  const handleSignup = () => {
    fetch('/signup', {
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
        console.log('user created:', data);
        setSignUpError(false);
        dispatch(setGlobalUser(data));
        dispatch(setIsLoggedIn(true));
      })
      .catch((err) => {
        setSignUpError(true);
        console.log(err);
      });
  };

  // const handleLogin = () => {
  //   fetch('http://localhost:3000/login', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       username,
  //       password,
  //     }),
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`Error! status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log('username', data);
  //       setGlobalUser(data);
  //     })
  //     .catch((err) => console.log('login error:', err));
  // };

  function handleSubmit(e) {
    e.preventDefault();
    // e.target.reset();
  }

  return (
    <div className='signupWrapper'>
      <form onSubmit={handleSubmit} className='signupContainer'>
        <h1>Sign Up</h1>
        <label htmlFor='username'>
          <b>Create a username</b>
          <input
            id='username'
            type='text'
            onChange={handleChange}
            placeholder='Enter Username'
            name='username'
            required
          />
        </label>

        <label htmlFor='password'>
          <b>Create a password</b>
          <input
            id='password'
            type='text'
            onChange={handleChange}
            placeholder='Enter Password'
            name='password'
            required
          />
        </label>
        <Profile
          isSignUp={true}
          userName={username}
          appPage={appPage}
          onSignUp={handleSignup}
          signUpError={signUpError}
        />
      </form>
    </div>
  );
}
export default Signup;
