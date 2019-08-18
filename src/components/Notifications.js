import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
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

  removeVisualNotification(id) {
    this.setState({notifications: this.state.notifications.filter(function(notification) {
      return notification.id !== id
    })});
  }

  renderNotifications() {
    if (this.state.notifications.length == 0) {
      return <Text>No notifications yet.</Text>
    }
    return this.state.notifications.map( notification => (
      <Notification
        id={notification.id}
        key={notification.id}
        creator={notification.sender_id}
        creatorName={notification.sender_name}
        type={notification.notification_type}
        date={notification.updated_at}
        amount={notification.amount}
        remove={this.removeVisualNotification.bind(this) }
      />
      )
    )
  }

  render() {
    return(
      <ScrollView>
        { this.renderNotifications() }
      </ScrollView>
    )
  }
}
