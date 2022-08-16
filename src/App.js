import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import Router from './Router';

export default function App() {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}
