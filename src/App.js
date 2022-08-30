import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import Router from './Router';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  );
}
