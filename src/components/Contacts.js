import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
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
    axios.get(`${global.API_URL}/friendships/sent_friendships`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ pending: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  getFriendshipRequests() {
    axios.get(`${global.API_URL}/friendships/pending_friendships`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ requests: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
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

  renderContacts() {
    if (this.state.friends.length == 0) {
      return <Text>No contacts yet. Add a new friend to start to save money.</Text>
    }
    return this.state.friends.map( friend => (
      <Contact
        id={friend.id}
        key={friend.id}
        name={friend.first_name}
        type='normal'
      />
    ))
  }

  renderPendingFriendships() {
    if (this.state.pending.length == 0) {
      return <Text>It's great! There are no people making you wait.</Text>
    }
    return this.state.pending.map( friendship => (
      <Contact
        id={friendship.friendship_id}
        key={friendship.friendship_id}
        name={friendship.first_name}
        type='sent_request'
        delete={this.deletePending.bind(this)}
      />
    ))
  }

  renderRequestFriendships() {
    if (this.state.requests.length == 0) {
      return <Text>No pending requests</Text>
    }
    return this.state.requests.map( friendship => (
      <Contact
        id={friendship.friendship_id}
        key={friendship.friendship_id}
        name={friendship.first_name}
        type='pending_request'
        delete={this.deleteRequest.bind(this)}
      />
    ))
  }

  render() {
    return(
      <ScrollView>
        { this.renderContacts() }
        { this.renderPendingFriendships() }
        { this.renderRequestFriendships() }
      </ScrollView>
    )
  }
}
