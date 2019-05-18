import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Links from './Links'

export default class Home extends Component {
  constructor(props){
    super(props);
    //User,type,date and money
  }

  render() {
    return(
			<View>
				<Text>HOME we</Text>
				<Links />
			</View>
    )
  }
}
