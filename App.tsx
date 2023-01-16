import 'react-native-gesture-handler';
import React from 'react';

import { RootNavigator } from './src/navigation';
import BLEWrapper from './src/components/BLEWrapper';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (

    <Provider store={store}>
      <BLEWrapper />
    </Provider>
  )
};

export default App;