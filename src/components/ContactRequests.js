import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import { ScrollView } from 'react-native';
import { Segment, Container, Button, Text } from 'native-base';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';
import Contact from './presentational/Contact'

export default class Contacts extends Component {
  constructor(props){
    super(props);
    this.state = {
      tab: 0,
      pending: [],
      requests: []
    }
    this.getPendingFriendships = this.getPendingFriendships.bind(this);
    this.getFriendshipRequests = this.getFriendshipRequests.bind(this);
    this.renderPendingFriendships = this.renderPendingFriendships.bind(this);
    this.renderRequestFriendships = this.renderRequestFriendships.bind(this);
  }

  componentDidMount(){
    this.getPendingFriendships()
    this.getFriendshipRequests()
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
    contacts = this.state.tab == 0 ? this.renderRequestFriendships() : this.renderPendingFriendships()
    return(
      <ScrollView>
        <Container>
          <Segment>
            <Button active={this.state.tab == 0} onPress={ ()=> this.setState({tab: 0}) }>
              <Text>Pending Accept</Text>
            </Button>
            <Button last active={this.state.tab == 1} onPress={ ()=> this.setState({tab: 1}) }>
              <Text>Sent Requests</Text>
            </Button>
          </Segment>
          { contacts }
        </Container>
        <NavigationEvents onWillFocus={() => this.componentDidMount()} />
      </ScrollView>
    )
  }
}
