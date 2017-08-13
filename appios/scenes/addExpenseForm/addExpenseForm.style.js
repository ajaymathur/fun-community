import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  addExpenseForm: {
    flex: 1,
  },
	textInput: {
		height: 40,
		borderBottomWidth: 4,
		padding: 10,
		margin: 10,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
	},
	loginButton: {
		backgroundColor: '#f1f1f1',
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		borderRadius: 5
	},
	image: {
		height: 300,
		resizeMode: 'cover',
    borderRadius: 5
	},
  addExpenseButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3aa80e',
    margin: 10,
    borderRadius: 5
	},
  addImageBox: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    height: 300,
    backgroundColor: '#f1f1f1'
  },
  imageBox: {
    borderRadius: 10,
    margin: 10,
    height: 300,
    backgroundColor: '#f1f1f1'
  },
  addImageIcon: {
    fontSize: 100,
    color: '#b1aab4'
  }
});

export default styles;
