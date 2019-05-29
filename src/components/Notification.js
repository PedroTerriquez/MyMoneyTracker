import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';

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
    return this.state.notifications.map( notification => ( <Text> { `${notification.id} ${notification.status} ${notification.notification_type}` } </Text>))
  }

  render() {
    return(
      <View>
        <Text> NOTIFICATIONS </Text>
        { this.renderNotifications() }
      </View>
    )
  }
}
