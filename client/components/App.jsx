import React from 'react';
import FeatureContainer from '../containers/FeaturePageContainer';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';
import { useSelector, useDispatch } from 'react-redux';
import { setAppPage, setOAuthEnable } from '../slices';

function App(props) {
  const appPage = useSelector((state) => state.control.appPage);
  const oAuthEnabled = useSelector((state) => state.control.oAuthEnabled);
  const dispatch = useDispatch();

  const handleGoogleSignIn = () => {
    fetch('/oauth/google/redirect')
      .then((res) => res.json())
      .then((data) => (window.location.href = data.redirect));
  };

  const header = (
    <section className='header'>
      <img
        onClick={() => {
          dispatch(setAppPage('/'));
        }}
        className='logo'
        src={require('../images/logo.png')}
      />
    </section>
  );

  const getCurrentPage = () => {
    switch (appPage) {
      case '/signup':
        return (
          <Signup
            appPage={appPage}
            oAuth={oAuthEnabled}
            oAuthHandler={handleGoogleSignIn}
          />
        );
      case '/profile':
        return <Profile appPage={appPage} />;
      case '/feature':
        return (
          <FeatureContainer
            appPage={appPage}
            oAuth={oAuthEnabled}
            oAuthHandler={handleGoogleSignIn}
          />
        );
      default: //'/':
        return (
          <Login
            appPage={appPage}
            oAuth={oAuthEnabled}
            oAuthHandler={handleGoogleSignIn}
          />
        );
    }
  };

  return (
    <div>
      {header}
      {getCurrentPage()}
    </div>
  );
}

export default App;
