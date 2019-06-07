import React, { Component } from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { deviceStorage } from '../../services/deviceStorage';
import axios from 'axios';

class Contact extends Component {
  accept = (id) => {
    axios.post(`${global.API_URL}/friendships/${id}/accept`, {}, deviceStorage.loadToken() )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  reject = (id) => {
    axios.post(`${global.API_URL}/friendships/${id}/reject`, {}, deviceStorage.loadToken() )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  cancel = (id) => {
    axios.post(`${global.API_URL}/friendships/${id}/cancel`, {}, deviceStorage.loadToken() )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderRequestButtons(id){
    return(
      <Button
        title='Cancel'
        onPress={ () => this.cancel(id) } />
    )
  }

  renderPedingButton(id){
    return(
      <View>
        <Button
          title='Accept'
          onPress={ () => this.accept(id) }/>
        <Button
          title='Reject'
          onPress={ () => this.reject(id) } />
      </View>
    )
  }
  render() {
    const { id, name, type } = this.props
    let buttons;
    if (type == 'request') {
      buttons = this.renderRequestButtons(id)
    } else if (type == 'pending'){
      buttons = this.renderPedingButton(id)
    }

    return(
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Home') }>
        <Text>id: { id }</Text>
        <Text>{ name }</Text>
        { buttons }
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Contact)
