import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Links from './Links'
import Payment from './presentational/Payment'
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      payments: [],
    }
    this.getPayments = this.getPayments.bind(this)
  }

  componentDidMount(){
    this.getPayments()
  }

  getPayments() {
    axios.get(`${global.API_URL}/payments/friends_payments`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ payments: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderPayments() {
    return this.state.payments.map( payment => (
      <Payment
        key = { payment.id }
        id = { payment.id }
        creator = { payment.creator_id }
        method ='Cash'
        date = { payment.agreement_date }
        amount = { payment.amount }
        promise = { payment.payment_promise_id }
        balance = { payment.balance_id }
      />
    ))
  }

  render() {
    return(
      <View>
        <Text> LAST PAYMENTS </Text>
        { this.renderPayments() }
			</View>
    )
  }
}
