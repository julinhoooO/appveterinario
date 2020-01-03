import React from 'react';
import {
  StatusBar,
} from 'react-native';

import Navigator from './routes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF"/>
      <Navigator />
    </>
  );
};

export default App;
