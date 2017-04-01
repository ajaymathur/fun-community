import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: '#1252Fb',
    paddingTop: 40,
  },
  seachBox: {
    backgroundColor: '#1252ff',
    flex: 1,
    color: '#fff',
    paddingLeft: 5,
    borderColor: '#c2c2ff'
  },
  listTitle: {
    flexDirection: 'row',
    backgroundColor: '#5486ff',
    height: 30,
    alignItems: 'center',
    paddingLeft: 10,
  },
  listItem: {
    flexDirection: 'row',
    height: 50,
    borderColor: '#c2d2e2',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingLeft: 20,
  },
});

export default styles;
