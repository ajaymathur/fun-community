import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  expenseBlock: {
    margin: 5,
    flex: 1,
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#eeeeee',
    borderColor: '#dcdcdc',
    flexDirection: 'row',
    alignItems: 'center'
  },
  receiptImage: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 25,
  },
  expenseDetail: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default styles;
