// @flow

import React, { Component } from 'react';
import { View, Text, Button, ListView, TouchableHighlight } from 'react-native';
import AddExpense from '../addExpense';
import style from './styles';

import { forEach } from 'lodash';
import { expenditureRef, totalAmountRef } from '../../store/firebase.confidential';

let ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

class Budget extends Component{

  static navigationOptions = {
    tabBar: {
      label: 'Budget',
    },
  }

  constructor( props ) {
    super( props );
    this.state = {
      totalAmount : '0.00',
      expenses: ds.cloneWithRows([ ])
    };
    this.getAmountLeft = this.getAmountLeft.bind(this);
    this.pullExpenditure = this.pullExpenditure.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.renderExpenseList = this.renderExpenseList.bind(this);
    this.amountCollected = this.amountCollected.bind(this);
  }

  componentWillMount() {
    this.pullExpenditure();
    this.amountCollected();
  }

  amountCollected() {
    totalAmountRef.on('value', snap => {
      this.setState({
        totalAmount: snap.val(),
      });
    });
  }

  pullExpenditure() {
    let expenseStructured;
    expenditureRef.on('value', snap => {
      expenseStructured = [];
      snap.forEach(expense => {
        expenseStructured.push({
          amount: expense.val().amount,
          itemName: expense.val().itemName,
          key: expense.key
        });
      });
      this.setState({
        expenses: expenseStructured.reverse(),
      })
    });
  }

  addExpense(amount, itemName) {
    expenditureRef.push().set({
      amount,
      itemName,
    });
  }

  deleteItem(itemKey) {
    expenditureRef.child(itemKey).remove();
  }

  getAmountLeft() {
    let amountSpent = 0;
    forEach(this.state.expenses, expense => {
      amountSpent += Number(expense.amount);
    })
    return this.state.totalAmount - amountSpent;
  }

  renderExpenseList(rowData) {
    return <View style={style.list} key={rowData.key}>
      <View style={style.listHeader}>
        <Text>{rowData.itemName}</Text>
      </View>
      <View style={style.listItem}>
        <Text>${rowData.amount}</Text>
      </View>
      <View style={style.listFooter}>
        <TouchableHighlight 
          style={style.listFooterButton}
          onPress={this.deleteItem.bind(this, rowData.key)} >
          <Text>Delete</Text>
        </TouchableHighlight>
      </View>
    </View>
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={style.header}>
          <View style={style.subHeader}>
            <Text style={style.headingtext}>Amount Collected</Text>
            <Text style={style.headingtext}>$ {this.state.totalAmount}</Text>
          </View>
          <View style={style.subHeader}>
            <Text style={style.headingtext}>Amount Available</Text>
            <Text style={style.headingtext}>$ {this.getAmountLeft()}</Text>
          </View>
        </View>
        <View style={{flex: 10}}>
          <ListView
            enableEmptySections={true}
            dataSource={ds.cloneWithRows(this.state.expenses)}
            renderRow={(rowData) => this.renderExpenseList(rowData)}
          />
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
