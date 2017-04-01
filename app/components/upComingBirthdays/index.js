// @flow

import React, { Component } from 'react';
import { View, Text, ListView, ScrollView, Button, TextInput } from 'react-native';

import styles from './styles';
import { birthdayRef } from '../../store/firebase.confidential';
import forEach from 'lodash/forEach';
class UpComingBirthdays extends Component{

  static navigationOptions = {
    title: 'UpComing Birthdays',
  };


  constructor(props) {
    super(props);
    this.state = {
    dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.listenForItems();
    this.renderListData = this.renderListData.bind(this);
  }

  listenForItems() {
    birthdayRef.on('value', (snap) => {
      let items = [];
      let birthdays = [];
      snap.forEach((child) => {
        child.forEach(innerChild => {
          birthdays = `${innerChild.val().date} | ${innerChild.key}`;
        });
        items.push({
          birthdays: birthdays,
          title: child.key,
          _key: child.key
        });

      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([ {birthdays: [] }, { 'Ajay Narain Mathur' : '27-01' }])
    })
  }

  renderListData(rowData) {
    return <View>
      <View style={styles.listTitle}>
        <Text> {rowData.title} </Text>
      </View>
      <View style={styles.listItem}>
        <Text> {forEach(rowData.birthdays, bit => bit.name )}</Text>
      </View>
    </View>
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <TextInput
            style={styles.seachBox}
            placeholder="Enter text to see events"
          />
        </View>
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderListData(rowData)}
          />
        </View>
      </View>
    )
  }
}

export default UpComingBirthdays;
