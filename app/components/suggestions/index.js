// @flow

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import AddSuggestions from '../addSuggestion';

import { suggestionsRef, auth, provider } from '../../store/firebase.confidential';
class Suggestions extends Component{

  constructor( props ) {
    super( props );
    this.state = { user: 'somethis' };
    this.addSuggestion = this.addSuggestion.bind(this);
    this.signIn = this.signIn.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
  }

  componentWillMount() {
    //this.bindEvents();
  }

  signIn() {
   // auth.signInWithRedirect(provider);
  }

  bindEvents() {
    auth.getRedirectResult().then((result) => {
      this.setState({
        user: result.user,
      })
    }).catch(() => { });
  }

  static navigationOptions = {
    tabBar: {
      label: 'Suggestions',
     
    },
  }

  addSuggestion() {

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 5}}>
          <Text>Add</Text>
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
