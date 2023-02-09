import React, { useState } from 'react';
import Login from './Login';
import Profile from './Profile';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoggedIn, setGlobalUser } from '../slices';

function Signup(props) {
  const { appPage, oAuth, oAuthHandler } = props;
  const [signUpError, setSignUpError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
        <Login
          isSignUp={true}
          handleUser={handleUserNameChange}
          handlePassword={handlePasswordChange}
        />
        <Profile
          userName={username}
          appPage={appPage}
          onSignUp={handleSignup}
          signUpError={signUpError}
          oAuth={oAuth}
          oAuthHandler={oAuthHandler}
        />
      </form>
    </div>
  );
}
export default Signup;
