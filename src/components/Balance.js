import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';
import Payment from './presentational/Payment'

export default class Balance extends Component {
  constructor(props){
    super(props);
    this.state = {
      payments : [],
      info: null
    }
    this.getPayments = this.getPayments.bind(this);
    this.renderPayments = this.renderPayments.bind(this);
  }

  componentDidMount() {
    this.getPayments(this.props.navigation.getParam('id'))
  }

  getPayments(id) {
    axios.get(`${global.API_URL}/balances/${id}`, deviceStorage.loadToken() )
      .then((response) => {
        this.setState({ payments: response.data.payments, info: response.data.balance })
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
    const { navigation } = this.props
    return(
      <View>
        <Text>Balance with USER</Text>
        <Text>{ JSON.stringify(this.state.info) }</Text>
        <Button title='Add Payment' onPress={ () => navigation.navigate('AddPayment', { id: navigation.getParam('id'), type: 'balance', recipient: this.state.info.user2_id }) } />
        <Text>-------------------</Text>
        <Text>Last Payments</Text>
        { this.renderPayments() }
      </View>
    )
  }
}
