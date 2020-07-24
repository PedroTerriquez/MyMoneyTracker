import React, { Component } from 'react';
import { Button, ScrollView } from 'react-native';
import { deviceStorage } from '../services/deviceStorage';
import { NavigationEvents } from 'react-navigation';
import PromiseHeader from './presentational/PromiseHeader'
import Payment from './presentational/Payment'
import axios from 'axios';

export default class Promise extends Component {
  constructor(props){
    super(props);
    this.state = {
      payments : [],
      info: null,
      spinner: true
    }
    this.renderPayments = this.renderPayments.bind(this);
  }

  componentDidMount() {
    this.getPayments(this.props.navigation.getParam('id'))
  }

  getPayments = (id) => {
    axios.get(`${global.API_URL}/promises/${id}`, deviceStorage.loadToken() )
      .then((response) => {
        this.setState({ payments: response.data.payments, info: response.data.promise, spinner: false })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderPayments() {
    return this.state.payments.map( payment => (
      <Payment
        key     = { payment.id }
        id      = { payment.id }
        creator = { payment.creator_id }
        creatorName = { payment.creator_name }
        method  ='Cash'
        date    = { payment.agreement_date }
        amount  = { payment.amount }
        status  = { payment.status }
        title   = { payment.title }
        mine    = { payment.mine }
        type    = { payment.paymentable_type}
        paymentable_id = { payment.paymentable_id }
        updateGraphic={ () => this.getPayments(this.props.navigation.getParam('id')) }
      />
    ))
  }

  renderSpinner(){
    if (this.state.spinner) { return <spinner color='green' />}
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
          !info.mine && <Button
            title='Add Payment'
            onPress={ () => navigation.navigate('AddPayment', {
              id: navigation.getParam('id'),
              type: 'Promise',
              recipient: info.administrator_id,
              recipientName: info.creator_name
              })
            } />
        }
        { this.renderSpinner() }
        { this.renderPayments() }
        <NavigationEvents onWillFocus={() => this.getPayments(info.id)} />
      </ScrollView>
    )
  }
}
