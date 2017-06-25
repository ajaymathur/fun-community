import React, { Component } from 'react';
import { View, Text, Image, Button, ActivityIndicator } from 'react-native';
import {expenditureRef} from '../../store/firebase.confidential';
class ExpenseDetail extends Component {

  deleteItem(itemKey) {
    expenditureRef.child(itemKey).remove()
    .then(() => {
      this.props.navigation.goBack();
    });
  }

  render() {
    const item = this.props.navigation.state.params.item;
    return (
      <View>
        <Text>{item.itemName}</Text>
        <Text>${item.amount}</Text>
        <Image
          source={{ uri: item.imageUrl }}
          style={{width: 200, height: 200,}}
          onProgress={() => <ActivityIndicator animating="true"/>}
        />
        <Button
          title="Remove"
          onPress={() => { this.deleteItem(item.key) }}
        />
      </View>
    )
  }
}

export default ExpenseDetail;
