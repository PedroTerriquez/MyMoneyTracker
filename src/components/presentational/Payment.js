import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';
import { deviceStorage } from '../../services/deviceStorage';
import ToastService from '../../services/ToastService.js';
import axios from 'axios';
import TimeAgo from 'react-native-timeago';

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
      'Payment Acceptance',
      'Accept this payment?',
      [
        {text: 'NO', onPress: () => console.log('No Pressed')},
        {text: 'YES', onPress: () => this.accept(id)},
      ],
      {cancelable: false},
    );
  }

  accept = (id) => {
    axios.patch(`${global.API_URL}/payments/${id}/accept`, { status: 'accepted' }, deviceStorage.loadToken() )
      .then((response) => {
        this.setState({statusChanged: 'accepted'})
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
    return(
      <TouchableOpacity onPress={() => this.handleClick(paymentable_id, type)}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'https://picsum.photos/100/100.jpg'}} />
              <Body>
                <Text>{creatorName}</Text>
                <Text note>{title}</Text>
                <Text note>
                  <TimeAgo time={date} />
                </Text>
              </Body>
            </Left>
            <Right>
              <Text style={(mine==true ? style.greenText : style.grayText)}>{amount}</Text>
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
                accepted && <Button small success style={style.smallButton} >
                  <Icon type='FontAwesome' name='check' />
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
  greenText: {color: 'green'},
  grayText: {color: 'grey'},
  pendingButton: {height: 52,width: 52, borderRadius:35},
  smallButton: {height: 50,width: 50, borderRadius:35}
})

export default withNavigation(Payment)
