import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ListItem, Thumbnail, Text, Button, Left, Body } from 'native-base';
import { withNavigation } from 'react-navigation';
import { deviceStorage } from '../../services/deviceStorage';
import ToastService from '../../services/ToastService.js';
import axios from 'axios';
import TimeAgo from 'react-native-timeago';

class Notification extends Component {
  accept = (id) => {
    axios.patch(`${global.API_URL}/notifications/${id}`, { status: 'accepted' }, deviceStorage.loadToken() )
      .then((response) => {
        this.props.remove(id)
      })
      .catch((error)=>{
        ToastService.showToast(error.response.data.errors);
      })
  }

  reject = (id) => {
    axios.patch(`${global.API_URL}/notifications/${id}`, { status: 'cancel' }, deviceStorage.loadToken() )
      .then((response) => {
        console.log(response.data)
        this.props.remove(id)
      })
      .catch((error)=>{
        ToastService.showToast(error.response.data.errors);
      })
  }

  redirect = (id, type) => {
    this.props.navigation.navigate(type, {id: id})
  }

  list_elements(type, amount, sender){
    if(type === 'Payment')
      return (<Text style={{ fontSize: 15 }}>Payment received of { amount && <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{amount}</Text> } from {sender}.</Text>)
    else if (type === 'Balance')
      return (<Text>{sender} want to start a Balance with you.</Text>)
    else if (type === 'Promise')
      return (<Text>{sender} is promising you pay this amount.</Text>)
    else if (type === 'Friendship')
      return (<Text>{sender} wants contact with you.</Text>)
  }

  render() {
    const { id, creator, creatorName, nId, nType, eType, eId, amount, date, status } = this.props
    return(
      <ListItem thumbnail onPress={ () => this.redirect(eId || nId, eType || nType) }>
        <Left>
          <Thumbnail source={{ uri: 'https://picsum.photos/50/50.jpg' }} />
        </Left>
        <Body>
          {this.list_elements(nType, amount, creatorName)}
          <Text note>
            <TimeAgo time={date} />
          </Text>
          <Text/>
          { (status == 'pending') && <View style={{flexDirection:'row'}}>
            <Button
              success
              primary
              small
              style={{margin: 2}}
              onPress={ () => this.accept(id) }>
              <Text>Accept</Text>
            </Button>
            <Button
              danger
              bordered
              small
              style={{margin: 2}}
              onPress={ () => this.reject(id) }>
              <Text>Decline</Text>
            </Button>
          </View>
          }
        </Body>
      </ListItem>
    )
  }
}

export default withNavigation(Notification)
