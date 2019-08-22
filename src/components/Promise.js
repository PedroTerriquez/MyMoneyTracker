import React, { Component } from 'react';
import { Button, ScrollView } from 'react-native';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';
import Payment from './presentational/Payment'
import PromiseHeader from './presentational/PromiseHeader'
import { NavigationEvents } from 'react-navigation';

export default class Promise extends Component {
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
    axios.get(`${global.API_URL}/promises/${id}`, deviceStorage.loadToken() )
      .then((response) => {
        this.setState({ payments: response.data.payments, info: response.data.promise })
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
        creatorName = { payment.creator_name }
        method ='Cash'
        date = { payment.agreement_date }
        amount = { payment.amount }
        balance = { payment.balance_id }
        status  = { payment.status }
        title   = { payment.title }
        mine    = { payment.mine }
        type    = { payment.paymentable_type}
        paymentable_id = { payment.paymentable_id }
      />
    ))
  }

  render() {
    const { navigation } = this.props
    const { info } = this.state
    return(
      info && <ScrollView>
        <PromiseHeader
          id={ info.id }
          title={ info.title }
          paid={ info.paid_amount }
          total={ info.total }
          creator={info.creator_name}
        />
        {
          !info.mine && <Button title='Add Payment' onPress={ () => navigation.navigate('AddPayment', { id: navigation.getParam('id'), type: 'Promise', recipient: info.administrator_id }) } />
        }
        { this.renderPayments() }
        <NavigationEvents onWillFocus={() => this.getPayments(info.id)} />
      </ScrollView>
    )
  }
}
