import React from 'react';
import { YellowBox } from 'react-native';

// removes warnings about web socket.
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

import Routes from './routes';

export default function App() {
  return <Routes />
}