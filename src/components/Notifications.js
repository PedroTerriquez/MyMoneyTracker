import React, { Component } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';
import Notification from './presentational/Notification'

export default class Notifications extends Component {
  constructor(props){
    super(props);
    this.state = {
      notifications: [],
    }
    this.getNotifications = this.getNotifications.bind(this);
    this.renderNotifications = this.renderNotifications.bind(this);
  }

  componentDidMount(){
    this.getNotifications()
  }

  getNotifications() {
    axios.get(`${global.API_URL}/notifications`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ notifications: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderNotifications() {
    return this.state.notifications.map( notification => (
      <Notification
        id={notification.id}
        creator={notification.sender_id}
        creatorName={notification.sender_name}
        type={notification.notification_type}
        amount={notification.amount} />
      )
    )
  }

  render() {
    return(
      <ScrollView>
        <Text> NOTIFICATIONS </Text>
        { this.renderNotifications() }
      </ScrollView>
    )
  }
}
