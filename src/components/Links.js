import React, {Component} from 'react';
import { Button, View } from 'react-native';

export default class Links extends React.Component {
  render(){
    return(
      <View>
        <Button title='-' />
        <Button title='-' />
        <Button title='-' />
        <Button title='Home' onPress={() => this.props.navigation.navigate('Home')} />
        <Button title='Contacts' onPress={() => this.props.navigation.navigate('Contacts')} />
        <Button title='Add Contact' onPress={() => this.props.navigation.navigate('AddContact')} />
        <Button title='Notifications' onPress={() => this.props.navigation.navigate('Notifications')} />
      </View>
    )
  }
}
