import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
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
          key: expense.key,
          imageUrl: expense.val().imageUrl
        });
      });
      this.setState({
        expenses: expenseStructured.reverse(),
      })
    })
  }

  getlistItems = ({ item }) => (
    <TouchableOpacity
      key={item.key}
      style={styles.expenseBlock}
      onPress={() => { this.props.navigation.navigate('ExpenseDetail', {item : item}) }}
    >
      <View>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.receiptImage}
        />
      </View>
      <View>
        <View>
          <Text>{item.itemName}</Text>
        </View>
        <View>
          <Text>${item.amount}</Text>
        </View>
        <View>
          <Text>{item.addedBy}</Text>
        </View>
      </View>


      {/*<View style={styles.expenseBlockHeader}>
        <Text>{item.itemName}</Text>
      </View>
      <View style={styles.expenseBlockBody}>
        <View>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.receiptImage}
          />
        </View>
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
      </View>*/}
    </TouchableOpacity>
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
