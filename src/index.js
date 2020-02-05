import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {
  Provider as PaperProvider,
  Portal,
  DefaultTheme,
} from 'react-native-paper';
import {StatusBar} from 'react-native';
import OneSignal from 'react-native-onesignal';
import NavigationBar from 'react-native-navbar-color';

import store from '~/store';

import Navigator from './routes';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0000b3',
    accent: '#001523',
  },
};

function App() {
  useEffect(() => {
    OneSignal.init('5a55c759-25b0-4ae8-9733-2f7b554b93b5');
    NavigationBar.setColor('#f1f1f1');
  }, []);
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Portal.Host>
          <StatusBar barStyle="dark-content" backgroundColor="#F1F1F1" />
          <Navigator />
        </Portal.Host>
      </PaperProvider>
    </Provider>
  );
}

export default App;
