import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';

import styles from './styles';
class AddSuggestions extends Component{
  render() {
    return(
      <View style={styles.Component}>
        <TextInput
          placeholder="Suggestion are welcome"
          style={styles.TextInput}
        />
        <TouchableHighlight
          style={styles.Button}
        >
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default AddSuggestions;
