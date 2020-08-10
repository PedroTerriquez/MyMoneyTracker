import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';
import { deviceStorage } from '../../services/deviceStorage';
import ToastService from '../../services/ToastService.js';
import TimeAgo from 'react-native-timeago';
import TextAvatar from 'react-native-text-thumbnail';
import moment from 'moment'
import axios from 'axios';
import I18n from "../../translations/i18n";

class Payment extends Component {
  constructor(props){
    super(props);
    this.state = { statusChanged: 'pending' }
  }

  handleClick = (id, type) => {
    this.props.navigation.navigate(type,  { id: id})
  }

  acceptPaymentButton = (id) => {
    if (this.props.status != 'pending' || this.props.mine) return
    Alert.alert(
      I18n.t("payment_acceptance"),
      I18n.t("payment_message"),
      [
        {text: I18n.t("no"), onPress: () => console.log('No Pressed')},
        {text: I18n.t("yes"), onPress: () => this.accept(id)},
      ],
      {cancelable: false},
    );
  }

  accept = (id) => {
    axios.patch(`${global.API_URL}/payments/${id}/accept`, { status: 'accepted' }, deviceStorage.loadToken() )
      .then((response) => {
        this.setState({statusChanged: 'accepted'})
        this.props.updateGraphic()
      })
      .catch((error)=>{
        ToastService.showToast(error.response.data.errors);
      })
  }

  render() {
    const { id, title, creator, creatorName, method, amount, date, paymentable_id, type, status, mine, recipientName, navigation } = this.props
    const pending = (mine == false && status == 'pending' && this.state.statusChanged == 'pending')
    const editable = (mine == true && status == 'pending')
    const accepted = (status == 'accepted' || this.state.statusChanged == 'accepted')
    const rejected = (status == 'rejected')

    let moneyColor = style.boldText
    if (mine && accepted) {
      moneyColor = style.greenText
    } else if ( rejected ) {
      moneyColor = style.redText
    } else if ( pending || editable ) {
      moneyColor = style.orangeText
    }
    return(
      <TouchableOpacity onPress={() => this.handleClick(paymentable_id, type)}>
        <Card>
          <CardItem>
            <Left>
              <TextAvatar size={50} type={'circle'}>
                { creatorName }
              </TextAvatar>
              <Body>
                <Text style={style.boldText}>{creatorName}</Text>
                <Text>{title}</Text>
                <Text note>{ moment(date).format('ll') } - <TimeAgo time={date} /> </Text>
              </Body>
            </Left>
            <Right style={ style.rightSmallSize }>
              <Text style={ moneyColor }>{amount}</Text>
              <Text />
              {
                pending && <Button
                  small
                  warning
                  onPress={()=> this.acceptPaymentButton(id) }
                  style={style.pendingButton} >
                  <Icon type='FontAwesome' name='warning' />
                </Button>
              }
              {
                editable && <Button
                  small
                  warning
                  onPress={()=> navigation.navigate('AddPayment', { props: this.props }) }
                  style={style.smallButton} >
                  <Icon type='MaterialIcons' name='edit' />
                </Button>
              }
              {
                accepted && <Button
                  small
                  success
                  style={style.smallButton} >
                  <Icon type='FontAwesome' name='check' />
                </Button>
              }
              {
                rejected && <Button
                  small
                  danger
                  style={style.smallButton} >
                  <Icon type='FontAwesome' name='times' />
                </Button>
              }
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  greenText: { fontWeight: 'bold', color: 'green'},
  redText: { fontWeight: 'bold', color: 'red'},
  orangeText: { fontWeight: 'bold', color: 'orange'},
  boldText: { fontWeight: 'bold' },
  pendingButton: {height: 52,width: 52, borderRadius:35},
  smallButton: {height: 50,width: 50, borderRadius:35},
  rightSmallSize: {flex: 0.5}
})

export default withNavigation(Payment)
