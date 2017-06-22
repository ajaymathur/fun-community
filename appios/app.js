import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './components/addButton/addButton.style';
import { TabNavigator, StackNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import Birthdays from './components/birthdays/birthdays';
import Expense from './components/expenses/expenses';
import AddButton from './components/addButton/addButton';
import AddExpense from './components/addExpense/addExpense';
const BIRTHDAY_NAVIGATOR = StackNavigator(
  {
    BirthdayList: {
      screen: Birthdays,
      path: 'birthday',
      navigationOptions: {
        title: 'Birthdays'
      }
    }
  }
);

const EXPENSE_NAVIGATOR = StackNavigator(
  {

    ExpenseList: {
      screen: Expense,
      path: 'expence',
      navigationOptions: ({ navigation }) => ({
        title: 'Expense',
        headerRight: <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpense')}
          >
            <Icon name="plus" style={{ color: '#4e4e4e' }}></Icon>
          </TouchableOpacity>
        </View>
      }),

      //{
      //title: 'Expense',
      //headerRight: <AddButton {...this.props} />
      // header: ({ navigate }) => ({
      //   right: (
      //     <AddButton navigate={navigate} />
      //   ),
      // }),
      //}
    },
    AddExpense: {
      screen: AddExpense,
      path: 'expence/add',
      navigationOptions: {
        title: 'How much did you spend?'
      }
    },

  }
);

export default TabNavigator(
  {

    Expense: {
      screen: EXPENSE_NAVIGATOR,
      path: 'expence',
      navigationOptions: {
        title: 'Expenses',
        tabBarIcon: ({ tintColor }) => <Icon name="money" style={{ color: tintColor }}></Icon>
      }
    },
    Birthday: {
      screen: BIRTHDAY_NAVIGATOR,
      navigationOptions: {
        tabBarLabel: 'Birthday',
        tabBarIcon: ({ tintColor }) => <Icon name="birthday-cake" style={{ color: tintColor }}></Icon>
      }
    },

  },
  {
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#ededed',
      },
      indicatorStyle: {
        backgroundColor: '#3595ff',
      },
      showIcon: true,
      showLabel: true,
      activeTintColor: '#000000',
      activeBackgroundColor: '#fdfdfd'
    }
  }
);


