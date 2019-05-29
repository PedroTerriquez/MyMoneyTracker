import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';

export default class Contacts extends Component {
  constructor(props){
    super(props);
    this.state = {
      friends : [],
      pending: [],
      requests: []
    }
    this.getFriends = this.getFriends.bind(this);
    this.getPendingFriendships = this.getPendingFriendships.bind(this);
    this.getFriendshipRequests = this.getFriendshipRequests.bind(this);
    this.renderContacts = this.renderContacts.bind(this);
    this.renderPendingFriendships = this.renderPendingFriendships.bind(this);
    this.renderRequestFriendships = this.renderRequestFriendships.bind(this);
  }

  componentDidMount(){
    this.getFriends()
    this.getPendingFriendships()
    this.getFriendshipRequests()
  }

  getFriends() {
    axios.get(`${global.API_URL}/friendships`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ friends: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  getPendingFriendships() {
    axios.get(`${global.API_URL}/friendships/pending_friendships_sended`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ pending: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  getFriendshipRequests() {
    axios.get(`${global.API_URL}/friendships/pending_friendships_requests`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ requests: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderContacts() {
    return this.state.friends.map( friend => ( <Text> { `${friend.id} ${friend.first_name} ${friend.email}` } </Text>))
  }

  renderPendingFriendships() {
    return this.state.pending.map( friendship => ( <Text> { `${friendship.id} ${friendship.first_name} ${friendship.email}` } </Text>))
  }

  renderRequestFriendships() {
    return this.state.requests.map( friendship => ( <Text> { `${friendship.id} ${friendship.first_name} ${friendship.email}` } </Text>))
  }

  render() {
    return(
      <View>
        <Text> CONTACTS </Text>
        { this.renderContacts() }
        <Text> PENDING </Text>
        { this.renderPendingFriendships() }
        <Text> REQUESTS </Text>
        { this.renderRequestFriendships() }
      </View>
    )
  }
}
