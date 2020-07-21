import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import { ScrollView, Text } from 'react-native';
import { List, Spinner } from 'native-base'
import { deviceStorage } from '../services/deviceStorage';
import Notification from './presentational/Notification'
import axios from 'axios';
import I18n from "../translations/i18n";

export default class Notifications extends Component {
  constructor(props){
    super(props);
    this.state = {
      notifications: [],
      spinner: true,
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
        this.setState({ notifications: response.data, spinner: false })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  removeButtons(id) {
    clone = this.state.notifications.slice()
    let index = clone.findIndex(el => el.id == id);
    clone[index].status = "modified"
    this.setState({notifications: clone})
  }

  renderNotifications() {
    if (!this.state.spinner && this.state.notifications.length == 0) {
      return <Text>{I18n.t("noti_empty")}</Text>
    }
    return this.state.notifications.map( notification => (
      <Notification
        id     = {notification.id}
        key    = {notification.id}
        creator= {notification.sender_id}
        nId    = {notification.notifiable_id}
        nType  = {notification.notifiable_type}
        eId    = {notification.element_id}
        eType  = {notification.element_type}
        date   = {notification.updated_at}
        amount = {notification.amount}
        status = {notification.status}
        message= {notification.message}
        creatorName={notification.sender_name}
        remove={this.removeButtons.bind(this) }
      />
      )
    )
  }

  renderSpinner(){
    if (this.state.spinner) { return <Spinner color='green' />}
  }

  render() {
    return(
      <ScrollView>
        <List>
          { this.renderSpinner() }
          { this.renderNotifications() }
        </List>
        <NavigationEvents onWillFocus={() => this.getNotifications()} />
      </ScrollView>
    )
  }
}
