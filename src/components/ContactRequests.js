import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import { ScrollView } from 'react-native';
import { Segment, Container, Button, Text, Spinner } from 'native-base';
import { deviceStorage } from '../services/deviceStorage';
import Contact from './presentational/Contact'
import axios from 'axios';

export default class Contacts extends Component {
  constructor(props){
    super(props);
    this.state = {
      tab: 0,
      pending: [],
      sent: [],
      spinner: true
    }
    this.getFriendshipRequests = this.getFriendshipRequests.bind(this);
    this.renderPendingFriendships = this.renderPendingFriendships.bind(this);
    this.renderSentFriendships = this.renderSentFriendships.bind(this);
  }

  componentDidMount(){
    this.getFriendshipRequests()
  }

  getFriendshipRequests() {
    axios.get(`${global.API_URL}/friendships/requests`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ pending: response.data.pending, sent: response.data.sent, spinner: false})
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
    this.setState({sent: this.state.sent.filter(function(friendship) {
      return friendship.friendship_id !== id
    })});
  }

  renderSpinner(){
    if (this.state.spinner) { return <Spinner color='green' />}
  }

  renderPendingFriendships() {
    if (!this.state.spinner && this.state.pending.length == 0) {
      return <Text>No pending requests.</Text>
    }
    return this.state.pending.map( friendship => (
      <Contact
        id={friendship.friendship_id}
        key={friendship.friendship_id}
        name={friendship.first_name}
        type='pending_request'
        delete={this.deletePending.bind(this)}
      />
    ))
  }

  renderSentFriendships() {
    if (!this.state.spinner && this.state.sent.length == 0) {
      return <Text>It's great! There are no people making you wait</Text>
    }
    return this.state.sent.map( friendship => (
      <Contact
        id={friendship.friendship_id}
        key={friendship.friendship_id}
        name={friendship.first_name}
        type='sent_request'
        delete={this.deleteRequest.bind(this)}
      />
    ))
  }

  render() {
    contacts = this.state.tab == 0 ? this.renderPendingFriendships() : this.renderSentFriendships()
    return(
      <ScrollView>
        <Container>
          <Segment>
            <Button first active={this.state.tab == 0} onPress={ ()=> this.setState({tab: 0}) }>
              <Text>Pending Requests</Text>
            </Button>
            <Button last active={this.state.tab == 1} onPress={ ()=> this.setState({tab: 1}) }>
              <Text>Sent Requests</Text>
            </Button>
          </Segment>
          { this.renderSpinner() }
          { contacts }
        </Container>
        <NavigationEvents onWillFocus={() => this.componentDidMount()} />
      </ScrollView>
    )
  }
}
