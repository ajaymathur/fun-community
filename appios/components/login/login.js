import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';

import { auth } from '../../store/firebase.confidential';

import styles from './login.styles';
class Login extends Component {

  constructor(props) {
    super(props);
  }

  initiateLogin() {
    this.props.doLogin( this.state.userName, this.state.password );
  }

  render() {
    return (
      <View>
        <Text
          style={styles.heading}
        >Login</Text>
        <TextInput
          placeholder="UserName"
          keyboardType="email-address"
          style={styles.TextInput}
          onChangeText={(userName) => this.setState({ userName })}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.TextInput}
          onChangeText={(password) => this.setState({ password })}
        />
        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => {this.initiateLogin()}}
        >
          <Text>Login</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default Login;