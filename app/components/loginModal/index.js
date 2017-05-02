import React, { Component } from 'react';
import styles from './styles';

import { View, TextInput, Button, Text } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      userNameError: 0,
      passwordError: 0,
    };
    this.initiateLogin = this.initiateLogin.bind(this);
  }

  getUserNameError() {
    if ( this.state.userNameError === 1 ) {
      return <Text
                style={styles.errorMessage}
              >
                Username Cannot be left blank
              </Text>
    }
  }

  getPasswordError() {
    if ( this.state.passwordError === 1 ) {
      return <Text
                style={styles.errorMessage}
              >
                Password Cannot be left blank
              </Text>
    } else if ( this.state.passwordError === 2 ) {
      return <Text
                style={styles.errorMessage}
              >
                Please make sure password was for the given email
              </Text>
    }
  }

  initiateLogin() {
    this.setState({
      userNameError: 0,
      passwordError: 0,
    })
    if ( this.state.userName.trim() === '' ) {
      this.setState({
        userNameError: 1,
      })
    }
    if ( this.state.password.trim() === '' ) {
      this.setState({
        passwordError: 1,
      })
    }

    if ( !(this.state.userNameError && this.state.passwordError) ) {
       this.props.login( this.state.userName, this.state.password)
       .catch(error => {
          this.setState({
            passwordError: 2,
            password: '',
          })
       });
    }
  }

  render() {
    return (
      <View style={styles.loginPanel}>
        <Text>Login</Text>
        <TextInput
          placeholder="Username"
          onChangeText={userName => this.setState({ userName })}
          autoFocus={true}
          keyboardType={'email-address'}
        />
        {this.getUserNameError()}
        <TextInput
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          secureTextEntry={true}
        />
        {this.getPasswordError()}
        <Button
          title="Login"
          onPress={ this.initiateLogin }
        />
      </View>
    )
  }
}

export default Login;
