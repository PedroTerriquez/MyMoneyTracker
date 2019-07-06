import React, { Component } from 'react';
import { ScrollView } from 'react-native';
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
    return this.state.pending.map( friendship => (
      <Contact
        id={friendship.friendship_id}
        key={friendship.friendship_id}
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
        key={friendship.friendship_id}
        name={friendship.first_name}
        type='request'
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
