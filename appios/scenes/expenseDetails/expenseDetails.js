import React, { Component } from 'react';
import { ScrollView, Text, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import {expenditureRef} from '../../store/firebase.confidential';
import Styles from './expenseDetails.style';

class ExpenseDetail extends Component {

  constructor() {
    super();
    this.state = {
      imageLoaded: false
    };
  }

  deleteItem(itemKey) {
    expenditureRef.child(itemKey).remove()
    .then(() => {
      this.props.navigation.goBack();
    });
  }

  imageLoadSuccess() {
    this.setState({
      imageLoaded: true
    });
  }

  render() {
    const item = this.props.navigation.state.params.item;
    return (
      <ScrollView style={Styles.mainView}>
        <Text style={Styles.itemName}>{item.itemName}</Text>
        <Text style={Styles.itemAmount}>${item.amount}</Text>
        <Image
          source={{ uri: item.imageUrl }}
          style={Styles.itemImage}
          onProgress={() => <ActivityIndicator animating={true}/>}
        />
        <TouchableHighlight
          style={Styles.removeButton}
          onPress={() => { this.deleteItem(item.key) }}
        >
          <Text>
            Remove
          </Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

export default ExpenseDetail;
