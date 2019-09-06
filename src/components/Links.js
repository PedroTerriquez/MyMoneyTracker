import React, {Component} from 'react';
import { Button, View } from 'react-native';

export default class Links extends React.Component {
  render(){
    return(
      <View>
        <Button title='-' />
        <Button title='Home' onPress={() => this.props.navigation.navigate('Home')} />
        <Button title='Contacts' onPress={() => this.props.navigation.navigate('Contacts')} />
        <Button title='Requests' onPress={()=> this.props.navigation.navigate('ContactRequests')}/>
        <Button title='Add Contact' onPress={() => this.props.navigation.navigate('AddContact')} />
        <Button title='Notifications' onPress={() => this.props.navigation.navigate('Notifications')} />
        <Button title='All Balances' onPress={() => this.props.navigation.navigate('BalancesList')} />
        <Button title='All Promises' onPress={() => this.props.navigation.navigate('PromisesList')} />
      </View>
    )
  }
}
