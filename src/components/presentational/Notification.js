import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { ListItem, Thumbnail, Text, Button, Left, Body } from 'native-base';
import { withNavigation } from 'react-navigation';
import { deviceStorage } from '../../services/deviceStorage';
import ToastService from '../../services/ToastService.js';
import TimeAgo from 'react-native-timeago';
import axios from 'axios';

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
      return (<Text style={style.text}>Payment received of { amount && <Text style={style.bold}>{amount}</Text> } from {sender}.</Text>)
    else if (type === 'Balance')
      return (<Text>{sender} want to start a Balance with you.</Text>)
    else if (type === 'Promise')
      return (<Text>{sender} is promising pay you {amount} .</Text>)
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
          { (status == 'pending') && <View style={style.row}>
            <Button
              success
              primary
              small
              style={style.margin2}
              onPress={ () => this.accept(id) }>
              <Text>Accept</Text>
            </Button>
            <Button
              danger
              bordered
              small
              style={style.margin2}
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

const style = StyleSheet.create({
  row: {flexDirection: 'row'},
  text: { fontSize: 15 },
  boldText: { fontSize: 15, fontWeight: 'bold' },
  margin2: { margin: 2 },
})
export default withNavigation(Notification)
