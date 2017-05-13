import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, Animated } from 'react-native';

import styles from './styles';
class AddExpense extends Component{

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      item: '',
      amountLeft: new Animated.Value(0),
      itemLeft: new Animated.Value(0),
     };
  }

  animateAmount() {
    Animated.sequence([
      Animated.timing(
      this.state.amountLeft, {
        toValue: 15,
        duration: 50,
      }
    ),
    Animated.timing(
      this.state.amountLeft, {
        toValue: -15,
        duration: 100,
      }
    ),
    Animated.timing(
      this.state.amountLeft, {
        toValue: 0,
        duration: 50,
      }
    )
    ]).start();
  }

  animateItem() {
    Animated.sequence([
      Animated.timing(
      this.state.itemLeft, {
        toValue: 15,
        duration: 50,
      }
    ),
    Animated.timing(
      this.state.itemLeft, {
        toValue: -15,
        duration: 100,
      }
    ),
    Animated.timing(
      this.state.itemLeft, {
        toValue: 0,
        duration: 50,
      }
    )
    ]).start();
  }

  addExpenceTriggered() {
    let amount = this.state.amount.replace(/[^\d]/g, '');
    let item = this.state.item;
    if ( !amount.trim() ) {
      this.animateAmount();
    } else if ( !item.trim() ) {
      this.animateItem();
    }
    if (amount && item) {
      this.props.addExpense(this.state.amount, this.state.item);
      this.setState({
        amount: '',
        item: '',
      });
    }
  }

  amountStyle() {
    return {
      flex: 1,
      left: this.state.amountLeft,
    }
  }

  itemStyle() {
    return {
      flex: 4,
      left: this.state.itemLeft,
    }
  }

  render() {
    return(
      <View style={styles.Component}>
        <Text>$</Text>
        <Animated.View style={this.amountStyle()}>
          <TextInput
            placeholder="0.00"
            value={this.state.amount}
            onChangeText={(amount) => this.setState({amount})}
            keyboardType={'numeric'}
          />
        </Animated.View>
        <Text> for </Text>
        <Animated.View style={this.itemStyle()}>
          <TextInput
            placeholder="Item"
            value={this.state.item}
            onChangeText={(item) => this.setState({item})}
          />
        </Animated.View>
        <TouchableHighlight
          style={styles.Button}
          onPress={()=>this.addExpenceTriggered()}
        >
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default AddExpense;
