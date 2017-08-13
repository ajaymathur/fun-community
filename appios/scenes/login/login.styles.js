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
    borderColor: '#000000'
  },
  loginButton: {
    backgroundColor: '#dcdcdc',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  error: {
    backgroundColor: '#ff715a'
  },
  errorMessage: {
    margin: 10,
    color: '#ff0000'
  }
});

export default styles;
