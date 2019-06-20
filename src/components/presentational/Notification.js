import React, { Component } from 'react';
import { Button, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { deviceStorage } from '../../services/deviceStorage';
import axios from 'axios';

class Notification extends Component {
  accept = (id) => {
    axios.patch(`${global.API_URL}/notifications/${id}`, { status: 'accept' }, deviceStorage.loadToken() )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  reject = (id) => {
    axios.patch(`${global.API_URL}/notifications/${id}`, { status: 'cancel' }, deviceStorage.loadToken() )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  render() {
    const { id, creator, creatorName, type, amount } = this.props
    return(
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Home') }>
        <Text>Id: { id }</Text>
        <Text>Creator: { creator }</Text>
        <Text>From:{ creatorName }</Text>
        <Text>Type: { type }</Text>
        <Text>Amount: { amount }</Text>
        <Button
          title='Accept'
          onPress={ () => this.accept(id) }/>
        <Button
          title='Reject'
          onPress={ () => this.reject(id) } />
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Notification)
