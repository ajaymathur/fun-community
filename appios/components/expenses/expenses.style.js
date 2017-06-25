import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  expenseBlock: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#ededed',
    display: 'flex',
    flexDirection: 'row',
  },
  expenseBlockHeader: {
   padding: 5,
  },
  expenseBlockBody: {
    paddingLeft: 5,
    paddingRight: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  expenseBlockDeleteButton: {
    backgroundColor: '#ff0000',
    padding: 10,
  },
  receiptImage: {
    height: 50, 
    width: 50, 
    resizeMode: 'cover',
    margin: 10,
    borderRadius: 25,
  }
});

export default styles;