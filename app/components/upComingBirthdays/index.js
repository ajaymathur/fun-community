// @flow

import React, { Component } from 'react';
import { View, Text, ListView, ScrollView, Button, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './styles';
import { birthdayRef } from '../../store/firebase.confidential';
import { forEach, clone, filter, groupBy, flattenDeep, padStart, sortBy } from 'lodash';
import { months } from './constants';

class UpComingBirthdays extends Component{

  static navigationOptions = {
    title: 'UpComing Birthdays',
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
    birthdayRef.on('value', (snap) => {
      let items = [];
      let birthdays = groupBy( sortBy(snap.val(), 'date'), 'month' );
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
        loading: false
      });
    });
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows({'dummy': {date: '03', firstName: 'ajay2', month: '3'}})
    })
  }

  getListElements(rowData) {
    let listItems = [];
    forEach(rowData.birthdays, bit => listItems.push(<View key={bit.firstName+bit.date} style={styles.listItem}><Text>{padStart(bit.date,2,0)} | {bit.firstName}{bit.lastName}</Text></View>));
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
    let temp =  filter(this.state.completeSource, item => item.firstName && item.firstName.toLowerCase().indexOf(text.toLowerCase()) > -1);
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

  showLoader() {
    if ( this.state.loading )
    return <ActivityIndicator
            animating={true}
            style={{height: 80}}
            size="large"
            color="#004aff"
          />
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
        <View>
          
          {this.showLoader()}
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
