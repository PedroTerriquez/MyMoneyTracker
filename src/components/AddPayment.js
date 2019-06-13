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

  componentDidMount() {
    this.setState({ ...this.props.navigation.getParam('props') })
  }

  paymentValues() {
    return values = {
      title: this.state.title,
      amount: this.state.amount,
      balance_id: this.props.navigation.getParam('id'),
      payment_type: this.props.navigation.getParam('type'),
      recipient_id: this.props.navigation.getParam('recipient'),
    }
  }
  newPayment() {
    axios.post(`${global.API_URL}/payments/`, this.paymentValues(), deviceStorage.loadToken() )
      .then((response) => {
        this.props.navigation.goBack();
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
          value={this.state.title}
          placeholder='Title'
          onChangeText={ (text) => this.setState({title: text}) }
        />
        <TextInput
          placeholder='Amount'
          value={this.state.amount.toString()}
          onChangeText={ (text) => this.setState({amount: text}) }
          keyboardType={ 'numeric' }
        />
        <Button
          title='Save'
          onPress={ () => this.handleSubmit() }
        />
      </View>
    )
  }
}
