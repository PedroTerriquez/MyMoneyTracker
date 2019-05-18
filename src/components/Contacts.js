import React, { Component } from 'react';
import { Text, TextInput } from 'react-native';
import axios from 'axios';
import { View } from 'react-native';
import { deviceStorage } from '../services/deviceStorage';

export default class Contacts extends Component {
  constructor(props){
    super(props);
		this.state = { friends : [] }
		this.getFriends = this.getFriends.bind(this);
		this.renderContacts = this.renderContacts.bind(this);
  }

  getFriends() {
    axios.get(`${global.API_URL}/friendships`, { headers: { Authorization: "Bearer " + deviceStorage.loadToken() } })
      .then((response) => {
        this.setState({ friends: response.data })
      })
      .catch((error)=>{
      console.log(error);
    })
  }

  renderContacts() {
		this.getFriends()
		return this.state.friends.map( friend => ( <Text> { friend.first_name } </Text>))
  }

  render() {
    return(
      <View>{ this.renderContacts() }</View>
    )
  }
}
