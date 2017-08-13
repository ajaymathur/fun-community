import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';

import { auth } from '../../store/firebase.confidential';
import styles from './addExpense.styles';

import AddExpenseForm from '../addExpenseForm/addExpenseForm';
import Login from '../login/login';
class AddExpense extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loggedIn: false
    };
    this.doLogin = this.doLogin.bind(this);
  }

  componentDidMount() {
    this.isUserLoggedIn();
    //auth.signOut();
  }

  isUserLoggedIn() {
    //if (auth.currentUser) {
      this.setState({
        loggedIn: true,
      })
    //}
  }

  async doLogin(userName, password)  {
    await auth.signInWithEmailAndPassword(userName, password)
      .catch(error => {
        throw new Error(error);
      });
    this.setState({
      loggedIn: true,
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {
          this.state.loggedIn ?
            <AddExpenseForm
            /> :
            <Login
              doLogin={this.doLogin}
            />
        }
      </View>
    )
  }
}

export default AddExpense;
