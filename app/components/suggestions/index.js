// @flow

import React, { Component } from 'react';
import { View, Text, Button, ListView } from 'react-native';

import AddSuggestions from '../addSuggestion';

import style from './styles';
import { suggestionsRef, auth, provider } from '../../store/firebase.confidential';

import { forEach } from 'lodash';

class Suggestions extends Component{

  static navigationOptions = {
    tabBar: {
      label: 'Suggestions',
     
    },
  }

  constructor( props ) {
    super( props );
    this.state = { 
      suggestions:[ ], 
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.addSuggestion = this.addSuggestion.bind(this);
    this.signIn = this.signIn.bind(this);
    this.pullSuggestions = this.pullSuggestions.bind(this);
  }

  componentWillMount() {
    this.pullSuggestions();
  }

  pullSuggestions() {
    // suggestionsRef.push().set({
    //   title: 'get pizza',
    //   likes: '4',
    // })
    suggestionsRef.on('value', (snap) => {
      let suggestions = [];
      forEach( snap.val(), ( value, key ) => {
        suggestions.push({ ...value, id: key})
      });
      this.setState({
        suggestions
      });
    });
  }

  signIn() {
   // auth.signInWithRedirect(provider);
  }

  addSuggestion() {

  }

  render() {
    return (
      <View style={style.suggestions}>
        <View style={{flex: 5}}>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource.cloneWithRows(this.state.suggestions)}
            renderRow={(rowData) => <Text>{rowData.title}</Text>}
          />
        </View>
        <View style={{flex: 1}}>
          <AddSuggestions
            addSuggestion={this.addSuggestion()}
          />
        </View>
        <Text>{this.state.user}</Text>
      </View>
    )
  }
}

export default Suggestions;
