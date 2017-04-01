// @flow

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './app/app';

export default class FunCommunity extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('FunCommunity', () => App);
