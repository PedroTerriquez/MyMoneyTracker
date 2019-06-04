import React, { Component } from 'react';
import { Text, TextInput, Button, View } from 'react-native';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';

export default class AddPayment extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      amount: '',
    }
    this.newPayment = this.newPayment.bind(this);
  }

  newPayment() {
    values = {
      title: this.state.title,
      amount: this.state.amount,
      balance_id: this.props.navigation.getParam('id'),
      payment_type: this.props.navigation.getParam('type'),
      recipient_id: this.props.navigation.getParam('recipient'),
    }
    axios.post(`${global.API_URL}/payments/`, values, deviceStorage.loadToken() )
      .then((response) => {
        Alert.alert(
          'Payment Sent',
          'Your payment was succesfully sent to the recipient, waiting for his approval',
          [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel', },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  render() {
    return(
      <View>
        <TextInput
          autoFocus={ true }
          placeholder='Title'
          onChangeText={ (text) => this.setState({title: text}) }
        />
        <TextInput
          placeholder='Amount'
          onChangeText={ (text) => this.setState({amount: text}) }
          keyboardType={ 'numeric' }
        />
        <Button
          title='Send'
          onPress={ () => this.newPayment() }
        />
      </View>
    )
  }
}
