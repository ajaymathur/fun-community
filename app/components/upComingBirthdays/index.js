// @flow

import React, { Component } from 'react';
import { View, Text, ListView, ScrollView, Button, TextInput } from 'react-native';

import styles from './styles';
import { birthdayRef } from '../../store/firebase.confidential';
import { forEach, clone, filter, groupBy, flattenDeep } from 'lodash';
import { months } from './constants';

class UpComingBirthdays extends Component{

  static navigationOptions = {
    title: 'UpComing Birthdays',
  };

  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.renderListData = this.renderListData.bind(this);
    this.getFilteredData = this.getFilteredData.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentWillMount() {
    // birthdayRef.push().set({
    //   date: '02',
    //   name: 'Pragya',
    //   month: '8',
    // })
    birthdayRef.on('value', (snap) => {
      let items = [];
      let birthdays = groupBy( snap.val(), 'month' );
      forEach(birthdays, (birthday, month) => {
        items.push({
          title: months[month],
          birthdays: birthday,
          key: month,
        });
      });
      this.setState({
        filteredData: clone(items),
        completeSource: clone(snap.val()),
      });
      //console.log(birthdays);
    });
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows({'dummy': {date: '03', name: 'ajay2', month: '3'}})
    })
  }

  getListElements(rowData) {
    let listItems = [];
    forEach(rowData.birthdays, bit => listItems.push(<View key={bit.name+bit.date} style={styles.listItem}><Text>{bit.date} | {bit.name}</Text></View>));
    return listItems;
  }

  renderListData(rowData) {
    return <View key={rowData.key}>
      <View style={styles.listTitle}>
        <Text> {rowData.title} </Text>
      </View>
      <View>
        {this.getListElements(rowData)}
      </View>
    </View>
  }

  getFilteredData() {
    return this.state.dataSource.cloneWithRows(this.state.filteredData);
  }

  updateFilter(text) {
    let items =[];
    let temp =  filter(this.state.completeSource, item => item.name && item.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
    console.log(temp);
    console.log(text);
    let birthdays = groupBy( temp, 'month' );
    forEach(birthdays, (birthday, month) => {
      items.push({
        title: months[month],
        birthdays: birthday,
        id: birthday.key,
      });
    });
    this.setState({
      filteredData: clone(items),
    });
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <TextInput
            style={styles.seachBox}
            placeholder="Search birthday"
            placeholderTextColor= "#fff"
            onChangeText={(text) => {this.updateFilter(text)}}
          />
        </View>
        <View>
          <ListView
            enableEmptySections={true}
            dataSource={this.getFilteredData()}
            renderRow={(rowData) => this.renderListData(rowData)}
          />
        </View>
      </View>
    )
  }
}

export default UpComingBirthdays;
