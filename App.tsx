/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from "react";
import { StatusBar, PermissionsAndroid, Platform, Alert } from "react-native";
import JewelChat from "./src/components/JewelChat";
import { store, persistor } from './src/store';
import { Provider } from 'react-redux';
import colors from "./src/components/shared_styles/colors";
import { PersistGate } from 'redux-persist/integration/react';
import { NativeBaseProvider } from 'native-base';




function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar backgroundColor="transparent" barStyle="light-content" hidden={false} translucent={true} />
          <JewelChat />
        </PersistGate>
      </NativeBaseProvider>

    </Provider>
  )
}


export default App;
