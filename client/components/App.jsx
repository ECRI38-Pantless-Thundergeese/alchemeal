import React from 'react';
import FeatureContainer from '../containers/FeaturePageContainer';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';
import { useSelector } from 'react-redux';

function App(props) {
  const appPage = useSelector((state) => state.control.appPage);
  switch (appPage) {
    case '/signup':
      return <Signup appPage={appPage} />;
    case '/profile':
      return <Profile appPage={appPage} />;
    case '/feature':
      return <FeatureContainer appPage={appPage} />;
    default: //'/':
      return <Login appPage={appPage} />;
  }
}

export default App;
