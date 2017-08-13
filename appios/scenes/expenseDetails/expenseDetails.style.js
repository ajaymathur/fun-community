import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  itemName: {
    fontSize: 30,
    margin: 10
  },
  itemAmount: {
    fontSize: 25,
    margin: 10
  },
  itemImage: {
    height: 200,
    borderRadius: 5,
    margin: 10
  },
  removeButton: {
    backgroundColor: '#FF3A29',
    marginTop: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10
  }
});

export default styles;
