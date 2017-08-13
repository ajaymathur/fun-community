import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import styles from './birthdays.style';
/**firebase imports */
import { birthdayRef } from '../../store/firebase.confidential';

/**lodash imports */
import map from 'lodash/map';
import clone from 'lodash/clone';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';
import forEach from 'lodash/forEach';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

class Birthdays extends Component {

  constructor() {
    super();
    this.state = {
      filteredData: [],
    }
  }

  componentWillMount() {
    this.pullBirthdays();
  }

  /**
   * @description This will pull birthdays form server with once
   */
  pullBirthdays() {
    birthdayRef.once('value', snap => {
      let items = [];
      let birthdays = groupBy(sortBy(snap.val(), 'date'), 'month');
      forEach(birthdays, (birthday, month) => {
        items.push({
          title: months[month],
          birthdays: birthday,
          key: birthday + month,
        });
      });
      this.setState({
        filteredData: clone(items),
      });
    })
  }

  getInnerList = ({ item }) => {
    return (
      <View key={item.date} style={styles.listItems}>
        <Text> {item.date} | {item.firstName} {item.lastName} </Text>
      </View>
    )
  }

  getlistItems = ({ item }) => {
    return (
      <View key={item.key}>
        <View>
          <View style={styles.listSections}>
            <Text>{item.title}</Text>
          </View>
          <FlatList
            data={item.birthdays}
            key={item.date}
            renderItem={this.getInnerList}
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <FlatList
        data={this.state.filteredData}
        renderItem={this.getlistItems}
      />
    )
  }
}

export default Birthdays;
