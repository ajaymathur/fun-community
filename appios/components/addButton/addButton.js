import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './addButton.style';

/**firebase */
import { auth } from '../../store/firebase.confidential';

class AddButton extends Component {

  constructor( props ){
    super( props );
  }

  navigateAway() {
    this.props.navigation.navigate('AddExpense');
    // const navigateAction = NavigationActions.navigate({

    //   routeName: 'AddExpense',

    //   params: {},

    //   action: NavigationActions.navigate({ routeName: 'AddExpense' })
    // })

    // navigation.dispatch(navigateAction)
  }


  render() {
    return (
      <View style={styles.button}>
        <TouchableOpacity
          onPress={this.navigateAway}
        >
          <Icon name="plus" style={{ color: '#4e4e4e' }}></Icon>
        </TouchableOpacity>
      </View>
    )
  }
}

export default AddButton;
