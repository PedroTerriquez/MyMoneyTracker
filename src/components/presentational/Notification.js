import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { ListItem, Text, Button, Left, Body } from 'native-base';
import { withNavigation } from 'react-navigation';
import { deviceStorage } from '../../services/deviceStorage';
import ToastService from '../../services/ToastService.js';
import TextAvatar from 'react-native-text-thumbnail';
import TimeAgo from 'react-native-timeago';
import moment from 'moment'
import axios from 'axios';
import I18n from "../../translations/i18n";

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

  list_elements(type, amount, sender, message){
    if(type === 'Payment')
      return (<Text style={style.text}>{I18n.t("noti_payment")} {sender}: { amount && <Text style={style.boldText}>{amount}</Text> }, {I18n.t('noti_message')}: { message && <Text style={style.boldText}>{message}</Text>}.</Text>)
    else if (type === 'Balance')
      return (<Text>{sender} {I18n.t("noti_balance")}</Text>)
    else if (type === 'Promise')
      return (<Text>{sender} {I18n.t("noti_promise")} {amount}, {I18n.t('noti_message')}: {message && <Text style={style.boldText}>{message}</Text>} .</Text>)
    else if (type === 'Friendship')
      return (<Text>{sender} {I18n.t("noti_friendship")}</Text>)
  }

  render() {
    const { id, creator, creatorName, nId, nType, eType, eId, amount, date, status, message } = this.props
    return(
      <ListItem thumbnail onPress={ () => this.redirect(eId || nId, eType || nType) }>
        <Left>
          <TextAvatar size={50} type={'circle'}>
            { creatorName }
          </TextAvatar>
        </Left>
        <Body>
          {this.list_elements(nType, amount, creatorName, message)}
          <Text note>{ moment(date).format('ll') } - <TimeAgo time={date} /> </Text>
          <Text/>
          { (status == 'pending') && <View style={style.row}>
            <Button
              success
              primary
              small
              style={style.margin2}
              onPress={ () => this.accept(id) }>
              <Text>{I18n.t("noti_accept")}</Text>
            </Button>
            <Button
              danger
              bordered
              small
              style={style.margin2}
              onPress={ () => this.reject(id) }>
              <Text>{I18n.t("noti_decline")}</Text>
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
