import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, Animated } from 'react-native';

import { auth } from '../../store/firebase.confidential';

import styles from './login.styles';
class Login extends Component {

  constructor(){
    super();
    this.state = {
      userName: '',
      password: '',
      userLeft: new Animated.Value(0),
      passwordLeft: new Animated.Value(0),
      userNameError: '',
      passwordError: ''
    }
  }

  startAnimationUserName() {
    Animated.sequence([
      Animated.timing(
      this.state.userLeft, {
        toValue: 15,
        duration: 50,
      }
    ),
    Animated.timing(
      this.state.userLeft, {
        toValue: -15,
        duration: 100,
      }
    ),
    Animated.timing(
      this.state.userLeft, {
        toValue: 0,
        duration: 50,
      }
    )
    ]).start();
  }

  startAnimationPassword() {
    Animated.sequence([
      Animated.timing(
        this.state.passwordLeft, {
          toValue: 15,
          duration: 50,
        }
      ),
      Animated.timing(
        this.state.passwordLeft, {
          toValue: -15,
          duration: 100,
        }
      ),
      Animated.timing(
        this.state.passwordLeft, {
          toValue: 0,
          duration: 50,
        }
      )
    ]).start();
  }

  validateUserName() {
    if(this.state.userName.trim() === '') {
      this.setState({
        userNameError: 'UserName is required'
      });
      return false;
    }
    this.setState({
      userNameError: ''
    });
    return true;
  }

  validatePassword() {
    if(this.state.password.trim() === '') {
      this.setState({
        passwordError: 'Password is required'
      });
      return false;
    }
    this.setState({
      passwordError: ''
    });
    return true;
  }

  initiateLogin() {
    if(!this.validateUserName()) {
      this.startAnimationUserName();
      return;
    }

    if(!this.validatePassword()) {
      this.startAnimationPassword();
      return;
    }

    this.props.doLogin( this.state.userName, this.state.password )
      .catch(error => {
        this.startAnimationPassword();
        this.setState({
          password: '',
          passwordError: 'There is something wrong'
        });
      });
  }

  render() {

    return (
      <View>
        <Text
          style={styles.heading}
        >Login</Text>
        <Animated.View style={{left: this.state.userLeft}}>
          <TextInput
            placeholder="UserName"
            autoCapitalize="none"
            keyboardType="email-address"
            style={[styles.textInput, this.state.userNameError.trim() ? styles.error : '']}
            onChangeText={(userName) => this.setState({ userName })}
          />
          <Text
            style={styles.errorMessage}
          >{this.state.userNameError}</Text>
        </Animated.View>
        <Animated.View style={{left: this.state.passwordLeft}}>
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            style={[styles.textInput, this.state.passwordError.trim() ? styles.error : '']}
            onChangeText={(password) => this.setState({ password })}
          />
          <Text
            style={styles.errorMessage}
          >{this.state.passwordError}</Text>
        </Animated.View>
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
