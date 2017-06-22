import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import styles from './expenses.style';
/**firebase imports */
import {
  expenditureRef,
  totalAmountRef,
  auth
} from '../../store/firebase.confidential';

/**lodash imports */
import forEach from 'lodash/forEach';

class Expense extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
    }
  }

  componentWillMount() {
    this.pullExpenditure();
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
      })
    })
  }

  getlistItems = ({ item }) => (
    <View key={item.key} style={styles.expenseBlock}>
      <View style={styles.expenseBlockHeader}>
        <Text>{item.itemName}</Text>
      </View>
      <View style={styles.expenseBlockBody}>
        <View>
          <View>
            <Text>${item.amount}</Text>
          </View>
          <View>
            <Text>{item.addedBy}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.expenseBlockDeleteButton}
          onPress={() => { }}
        >
          <Text style={{color: '#ffffff'}}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  render() {
    return (
      <FlatList
        data={this.state.expenses}
        renderItem={this.getlistItems}
      />
    )
  }
}

export default Expense;
