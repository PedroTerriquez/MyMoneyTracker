import React, { Component } from 'react';
import { View, Button, ScrollView, Text, TextInput } from 'react-native';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';
import Contact from './presentational/Contact'

export default class Contacts extends Component {
  constructor(props){
    super(props);
    this.state = {
      friends: [],
      pending: [],
      requests: []
    }
    this.getFriends = this.getFriends.bind(this);
    this.getPendingFriendships = this.getPendingFriendships.bind(this);
    this.getFriendshipRequests = this.getFriendshipRequests.bind(this);
    this.renderContacts = this.renderContacts.bind(this);
    this.renderPendingFriendships = this.renderPendingFriendships.bind(this);
    this.renderRequestFriendships = this.renderRequestFriendships.bind(this);
    this.createBalance = this.createBalance.bind(this);
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

  createBalance(id){
    axios.post(`${global.API_URL}/balances/`, {user2_id: id}, deviceStorage.loadToken() )
      .then((response) => {
        console.log("BALANCE CREATED")
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderContacts() {
    return this.state.friends.map( friend => (
      <View>
        <Contact
          id={friend.id}
          name={friend.first_name}
        />
        <Button
          title='Create Promise'
          onPress={ () => this.props.navigation.navigate('AddPromise', {id: friend.id} )}
        />
        <Button
          title='Create Balance'
          onPress={ () => this.createBalance(friend.id) }
        />
      </View>
    ))
  }

  deletePending(id) {
    this.setState({pending: this.state.pending.filter(function(friendship) {
      return friendship.friendship_id !== id
    })});
  }

  deleteRequest(id) {
    this.setState({requests: this.state.requests.filter(function(friendship) {
      return friendship.friendship_id !== id
    })});
  }

  renderPendingFriendships() {
    return this.state.pending.map( friendship => (
      <Contact
        id={friendship.friendship_id}
        name={friendship.first_name}
        type='pending'
        delete={this.deletePending.bind(this)}
      />
    ))
  }

  renderRequestFriendships() {
    return this.state.requests.map( friendship => (
      <Contact
        id={friendship.friendship_id}
        name={friendship.first_name}
        type='request'
        delete={this.deleteRequest.bind(this)}
      />
    ))
  }

  render() {
    return(
      <ScrollView>
        <Text> CONTACTS </Text>
        { this.renderContacts() }
        <Text> ---------------------------------- </Text>
        <Text> PENDING </Text>
        { this.renderPendingFriendships() }
        <Text> ---------------------------------- </Text>
        <Text> REQUESTS </Text>
        { this.renderRequestFriendships() }
      </ScrollView>
    )
  }
}
