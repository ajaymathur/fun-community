import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    margin: 10,
  },
  textInput: {
    height: 40,
    borderBottomWidth: 4,
    padding: 4,
    margin: 10,
    borderColor: '#000000',
    backgroundColor: '#7d7d7d',
    color: '#ff0000'
  },
  loginButton: {
    backgroundColor: '#7d7d7d',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  error: {
    backgroundColor: '#ff0006'
  }
});

export default styles;