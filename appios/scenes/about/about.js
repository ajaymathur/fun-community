import React, {Component} from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './about.style';
class About extends Component{
  render() {
    return (
      <View style={Styles.banner}>
        <Text>Build with <Icon name="heart" style={{ color: '#ee3f24' }}/> by Ajay Narain Mathur</Text>
      </View>
    )
  }
}

export default About;
