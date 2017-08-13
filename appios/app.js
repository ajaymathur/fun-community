import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './components/addButton/addButton.style';
import { TabNavigator, StackNavigator, StackRouter } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import Birthdays from './scenes/birthdays/birthdays';
import Expense from './scenes/expenses/expenses';
import AddButton from './components/addButton/addButton';
import AddExpense from './scenes/addExpense/addExpense';
import ExpenseDetail from './scenes/expenseDetails/expenseDetails';
import About from './scenes/about/about';
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

const ABOUT = StackNavigator({
  About: {
    screen: About,
    path: 'about',
    navigationOptions: {
      title: 'About'
    }
  }
});

const EXPENSE_NAVIGATOR = StackNavigator(
  {
    ExpenseList: {
      screen: Expense,
      path: 'expence',
      navigationOptions: ({ navigation }) => ({
        title: 'Expense',
        headerRight: <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpense')}
            style={styles.button}
          >
            <Icon name="plus" style={{ color: '#4e4e4e' }}></Icon>
          </TouchableOpacity>
        </View>
      }),
    },
    AddExpense: {
      screen: AddExpense,
      path: 'expence/add',
      navigationOptions: {
        title: 'Add Expense'
      }
    },
    ExpenseDetail: {
      screen: ExpenseDetail,
      path: 'expence/detail',
      navigationOptions: {
        title: 'Detail'
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
    About: {
      screen: ABOUT,
      navigationOptions: {
        title: 'About',
        tabBarLabel: 'About',
        tabBarIcon: ({ tintColor }) => <Icon name="circle" style={{ color: tintColor }}></Icon>
      }
    },

  },
  {
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


