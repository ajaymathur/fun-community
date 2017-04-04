import { StyleSheet, Platform } from 'react-native';

const style = StyleSheet.create({
  header: {
    height: (Platform.OS === 'ios') ? 80 : 50,
    backgroundColor: '#1252Fb',
    paddingTop: (Platform.OS === 'ios') ? 40 : 10,
  },
  headingtext: {
    color: '#fff',
  },
  addExpense: {
    flex: 1,
  }
});

export default style;
