import React, { Component } from 'react';
import styles from './styles';

import { View, TextInput, Button, Text } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
    this.initiateLogin = this.initiateLogin.bind(this);
  }

  initiateLogin() {
    this.props.login( this.state.userName, this.state.password);
  }

  render() {
    return (
      <View style={styles.loginPanel}>
        <Text>Login</Text>
        <TextInput
          placeholder="User Name"
          style={styles.textBox}
          onChangeText={userName => this.setState({ userName })}
          autoFocus={true}
          keyboardType={'email-address'}
        />
        <TextInput
          placeholder="Password"
          style={styles.textBox}
          onChangeText={password => this.setState({ password })}
          secureTextEntry={true}
        />
        <Button
          title="Login"
          onPress={ this.initiateLogin }
        />
      </View>
    )
  }
}

export default Login;
