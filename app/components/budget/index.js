// @flow

import React, { Component } from 'react';
import { ScrollView, View, Text, Button, ListView, TouchableHighlight, Modal, ActivityIndicator } from 'react-native';
import AddExpense from '../addExpense';
import Login from '../loginModal';
import style from './styles';
import Loader from '../loader';
import { forEach } from 'lodash';
import { expenditureRef, totalAmountRef, auth } from '../../store/firebase.confidential';
import Icon from 'react-native-vector-icons/FontAwesome';

let ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

class Budget extends Component{

  static navigationOptions = {
    title: 'Budget',
    tabBarIcon: () => <Icon name="money"></Icon>,
  }

  constructor( props ) {
    super( props );
    this.state = {
      totalAmount : '0.00',
      expenses: [],
      loggedIn: false,
      loginModalVisible: false,
      loading: true,
    };
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    this.pullExpenditure();
    this.amountCollected();
    this.isUserLoggedIn();
    this.bindAuthChangeEvent();
    //auth.signOut();
  }

  async login(email, password) {
    await auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
          throw new Error(error);
        });
    this.setState({
      loginModalVisible: false,
    });
        
  }

  bindAuthChangeEvent() {
    auth.onAuthStateChanged(user => {
      if( user ) {
        this.setState({
          loggedIn: true,
        })
      } else {
        this.setState({
          loggedIn: false,
        })
      }
    })
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
      if (!snap) {
        console.log('offline');
      }
      expenseStructured = [];
      snap.forEach(expense => {
        expenseStructured.push({
          amount: expense.val().amount,
          itemName: expense.val().itemName,
          addedBy: expense.val().addedBy,
          key: expense.key
        });
      });
      this.setState({
        expenses: expenseStructured.reverse(),
        loading: false,
      })
    })
  }

  addExpense(amount, itemName) {
    expenditureRef.push().set({
      amount,
      itemName,
      addedBy: auth.currentUser.email,
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

  isUserLoggedIn() {
    if (auth.currentUser) {
      this.setState({
        loggedIn: true,
      })
    }
  }

  setModalVisible( visible = true ) {
    this.setState({
      loginModalVisible: visible,
    })
  }
 
  renderExpenseList(rowData) {
    return <View style={style.list} key={rowData.key}>
      <View style={style.listHeader}>
        <Text>{rowData.itemName} - {rowData.addedBy}</Text>
      </View>
      <View style={style.listItem}>
        <Text>${rowData.amount}</Text>
      </View>
      {this.state.loggedIn?  <View style={style.listFooter}>
          <TouchableHighlight 
            style={style.listFooterButton}
            onPress={this.deleteItem.bind(this, rowData.key)} >
            <Text>Delete</Text>
          </TouchableHighlight>
          </View>
        :
        <View style={style.listFooter}>

          </View>
      }
    
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
        <Loader
          showLoader={this.state.loading}
        />
        <View style={{flex: 4}}>
          <ListView
            enableEmptySections={true}
            dataSource={ds.cloneWithRows(this.state.expenses)}
            renderRow={(rowData) => this.renderExpenseList(rowData)}
          />
        </View>
        <View style={{height: 50}}>
          {this.state.loggedIn ? <AddExpense
                addExpense = {this.addExpense}
                style={style.addExpense}
              /> : <Button
                title='login'
                onPress={() => this.setModalVisible()}
              />
            }
        </View>
          <Modal
            animationType='slide'
            visible={this.state.loginModalVisible}
            onRequestClose={() => this.setModalVisible(false)}
            supportedOrientations={['portrait']}
          >
            <Login
             login={this.login}
            />
          </Modal>
      </View>
    )
  }
}

export default Budget;
