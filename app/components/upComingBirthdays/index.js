// @flow

import React, { Component } from 'react';
import { View, Text, ListView, TextInput } from 'react-native';

import styles from './styles';
import { birthdayRef } from '../../store/firebase.confidential';
import { forEach, clone, filter, groupBy, padStart, sortBy } from 'lodash';
import { months } from './constants';

import Loader from '../loader';

import Icon from 'react-native-vector-icons/FontAwesome';

class UpComingBirthdays extends Component{

  static navigationOptions = {
    title: 'Birthdays',
    tabBarIcon: () => <Icon name="birthday-cake"></Icon>
  };

  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      loading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      })
    };
    this.getFilteredData = this.getFilteredData.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentWillMount() {
    this.pullBirthday();
  }

  pullBirthday() {
    birthdayRef.once('value', (snap) => {
      this.createFilterDataObj(snap.val());
      this.createCompleteSource(snap.val());
    });
  }

  createFilterDataObj(filteredRecords) {
    let items = [];
    let birthdays = groupBy( sortBy(filteredRecords, 'date'), 'month' );
    forEach(birthdays, (birthday, month) => {
      items.push({
        title: months[month],
        birthdays: birthday,
        key: month,
      });
    });
    this.setState({
      filteredData: clone(items),
    });
  }

  createCompleteSource(snap) {
    forEach(snap, personObj => {
      personObj.searchString = personObj.date+ ' ' + months[personObj.month] + ' ' + personObj.firstName + ' ' + personObj.lastName;
    });
    this.setState({
      completeSource: snap,
      loading: false,
    })
  }

  getListElements(rowData) {
    let listItems = [];
    forEach(rowData.birthdays, bit => listItems.push(<View key={bit.firstName+bit.date} style={styles.listItem}><Text>{padStart(bit.date,2,0)} | {bit.firstName} {bit.lastName}</Text></View>));
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
    let temp = filter(this.state.completeSource, birthday =>
                filter(text.split(' '), search =>
                  birthday.searchString.toLowerCase().indexOf(search.toLowerCase()) > -1
                ).length === text.split(' ').length);
    this.createFilterDataObj(temp);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TextInput
            style={styles.seachBox}
            placeholder="Search birthday"
            placeholderTextColor= "#fff"
            returnKeyType="search"
            onChangeText={(text) => {this.updateFilter(text)}}
          />
        </View>
        <View style={{paddingBottom: 50}}>
          <Loader
            showLoader={this.state.loading}
          />
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
