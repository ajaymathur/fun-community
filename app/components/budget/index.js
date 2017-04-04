// @flow

import React, { Component } from 'react';
import { View, Text, Button, ListView } from 'react-native';

import AddExpense from '../addExpense';
import style from './styles';

class Budget extends Component{

  static navigationOptions = {
    tabBar: {
      label: 'Budget',
    },
  }

  constructor( props ) {
    super( props );
    this.state = {
      amountLeft : '0.00',
    };
    this.addExpense = this.addExpense.bind(this);
  }

  addExpense() {

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={style.header}>
          <Text style={style.headingtext}>Amount Available:</Text>
          <Text style={style.headingtext}>{this.state.amountLeft}</Text>
        </View>
        <View style={{flex: 4}}>
          <Text>Recent expences</Text>
        </View>
        <AddExpense
          addExpense = {this.addExpense}
          style={style.addExpense}
        ></AddExpense>
      </View>
    )
  }
}

export default Budget;
