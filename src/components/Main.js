
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Home from './Home/Home';
import EndTripButton from './Home/EndTripButton';
import RiderRequestScreen from './RiderRequestScreen/RiderRequestScreen';
import CountdownCircleScreen from './RiderRequestScreen/CountdownCircle';
import { App, AppStack, AuthStack } from '../utils/navigator';

export default class Main extends React.PureComponent {
  render() {
    return (
      <App />
    );
  }
}

