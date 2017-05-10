import React, { Component } from 'react';
import styles from './styles';

import { View, TextInput, Button, Text, Animated, Easing } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      userNameError: 0,
      passwordError: 0,
      userLeft: new Animated.Value(0),
      passwordLeft: new Animated.Value(0),
    };
    this.initiateLogin = this.initiateLogin.bind(this);
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
    if ( this.state.userNameError === 0 && this.state.passwordError === 1 ) {
      return <Text
                style={styles.errorMessage}
              >
                Password Cannot be left blank
              </Text>
    } else if ( this.state.userNameError === 0 && this.state.passwordError === 2 ) {
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
    });
    if ( !this.state.userName ) {
      this.startAnimationUserName();
      this.setState({
        userNameError: 1,
      });
      return;
    } else if ( !this.state.password ) {
      this.startAnimationPassword();
      this.setState({
        passwordError: 1,
      });
      return;
    }

    if ( !(this.state.userNameError || this.state.passwordError) ) {
      console.log(this.state.userName);
      console.log(this.state.password);
       this.props.login( this.state.userName, this.state.password)
       .catch(error => {
         this.startAnimationPassword();
          this.setState({
            passwordError: 2,
            password: '',
          })
       });
    }
  }

  render() {
    return (
      <Animated.View style={styles.loginPanel}>
        <Text>Login</Text>
        <Animated.View style={{left: this.state.userLeft}}>
        <TextInput
          placeholder="Username"
          onChangeText={userName => this.setState({ userName })}
          autoFocus={true}
          keyboardType={'email-address'}
        />
        </Animated.View>
        {this.getUserNameError()}
        <Animated.View style={{left: this.state.passwordLeft}}>
        <TextInput
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          secureTextEntry={true}
        />
        </Animated.View>
        {this.getPasswordError()}
        <Button
          title="Login"
          onPress={ this.initiateLogin }
        />
      </Animated.View>
    )
  }
}

export default Login;
