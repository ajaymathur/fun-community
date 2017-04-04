import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';

import styles from './styles';
class AddExpense extends Component{

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      item: '',
     };
    this.addExpenceTriggered = this.addExpenceTriggered.bind(this);
  }

  addExpenceTriggered() {
    this.props.addExpense(this.state.amount, this.state.item);
  }

  render() {
    return(
      <View style={styles.Component}>
        <Text>$</Text>
        <TextInput
          placeholder="0.00"
          style={styles.TextInputAmount}
          onChangeText={(amount) => this.setState({amount})}
        />
        <Text> for </Text>
        <TextInput
          placeholder="Item"
          style={styles.TextInput}
          onChangeText={(item) => this.setState({item})}
        />
        <TouchableHighlight
          style={styles.Button}
          onPress={this.addExpenceTriggered()}
        >
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default AddExpense;
