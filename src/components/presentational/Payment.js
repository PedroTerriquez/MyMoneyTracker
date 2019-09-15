import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';
import { deviceStorage } from '../../services/deviceStorage';
import ToastService from '../../services/ToastService.js';
import axios from 'axios';


class Payment extends Component {
  constructor(props){
    super(props);
    this.state = { statusChanged: 'pending' }
  }

  handleClick = (id, type) => {
    this.props.navigation.navigate(type,  { id: id})
  }

  handleLongPress = (id) => {
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
        this.setState({statusChanged: response.status})
      })
      .catch((error)=>{
        ToastService.showToast(error.response.data.errors);
      })
  }

  render() {
    const { id, title, creator, creatorName, method, amount, date, paymentable_id, type, status, mine } = this.props
    return(
      <TouchableOpacity onPress={() => this.handleClick(paymentable_id, type)} onLongPress={() => this.handleLongPress(id)}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'https://picsum.photos/100/100.jpg'}} />
              <Body>
                {/*
                <Text>Payment id: { id }</Text>
                <Text>Creator id: { creator }</Text>
                <Text>Status: { status }</Text>
								*/}
                <Text>{creatorName}</Text>
                <Text note>{method}</Text>
              </Body>
            </Left>
            <Right>
              <Text note>{date}</Text>
              <Text>${amount}</Text>
              { (status == 'pending' && this.state.statusChanged == 'pending') && <Body><Icon style={{fontSize: 20, color: '#fab005'}} type='FontAwesome' name='warning' /><Text>Pending</Text></Body>}
              { (mine == true && status == 'pending') &&
              <Button small success onPress={()=> this.props.navigation.navigate('AddPayment', { props: this.props }) }>
                <Icon type='FontAwesome' name='edit' />
              </Button>
              }
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Payment)
