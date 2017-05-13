import { StyleSheet, Platform } from 'react-native';

const style = StyleSheet.create({
  header: {
    height: (Platform.OS === 'ios') ? 80 : 50,
    backgroundColor: '#1252Fb',
    paddingTop: (Platform.OS === 'ios') ? 40 : 10,
    flexDirection: 'row',
  },
  subHeader:{
    flex: 1,
    height: (Platform.OS === 'ios') ? 50 : 30,
    alignItems: 'center',
  },
  headingtext: {
    color: '#fff',
  },
  addExpense: {
    height: 20,
    flex: 1,
  },
  list: {
    margin: 5,
    borderColor: '#29f',
    borderWidth: 2,
  },
  listHeader: {
    backgroundColor: '#29f',
    padding: 10,
  },
  listItem: {
    padding: 10,
  },
  listFooter: {
    flex: 1,
    flexDirection: 'row',
  },
  listFooterButton: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#29f',
    padding: 5,
  },
});

export default style;
