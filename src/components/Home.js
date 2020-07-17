import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import { Container, Button, Segment, Content, Text, Spinner} from 'native-base';
import Payment from './presentational/Payment'
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';
import { ActionCable, Cable } from '@kesha-antonov/react-native-action-cable'
import ToastService from '../services/ToastService.js';

export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      balance_payments: [],
      promise_payments: [],
      tab: 0,
      spinner: true
    }
    this.getPayments = this.getPayments.bind(this)
  }

  handleReceived(data) {
    ToastService.showGreenToast(`New ${data.notification.notifiable_type}`)
  }

  handleConnected() {
    console.log('connected to WS')
  }

  handleDisconnected() {
    console.log('disconnected to WS')
  }

  componentDidMount(){
    this.getPayments()
    const actionCable = ActionCable.createConsumer(`ws://localhost:3002/cable?token=${global.JWT}`)
    const cable = new Cable({})
    const channel = cable.setChannel( `notifications:${global.id}`, actionCable.subscriptions.create({ channel: 'NotificationsChannel' }))
    channel
      .on( 'received', this.handleReceived )
      .on( 'connected', this.handleConnected )
      .on( 'disconnected', this.handleDisconnected )
  }

  getPayments() {
    axios.get(`${global.API_URL}/payments/friends_payments`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ balance_payments: response.data.balance, promise_payments: response.data.promise, spinner: false })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderSpinner(){
    if (this.state.spinner) { return <Spinner color='green' />}
  }

  renderPayments(payments) {
    if (!this.state.spinner && payments.length == 0) {
      return <Text>No payments yet, start a promise or balance.</Text>
    }
    return payments.map( payment => (
      <Payment
        key     = { payment.id }
        id      = { payment.id }
        creator = { payment.creator_id }
        method  ='Cash'
        date    = { payment.created_at }
        amount  = { payment.amount }
        title   = { payment.title }
        status  = { payment.status}
        type    = { payment.paymentable_type }
        creatorName    = { payment.creator_name }
        paymentable_id = { payment.paymentable_id }
      />
    ))
  }

  render() {
    payments = this.state.tab == 0 ? this.renderPayments(this.state.promise_payments) : this.renderPayments(this.state.balance_payments)
    return(
      <Container>
        <Segment>
          <Button first active={this.state.tab == 0} onPress={ ()=> this.setState({tab: 0}) }>
            <Text>Promise</Text>
          </Button>
          <Button last active={this.state.tab == 1} onPress={ ()=> this.setState({tab: 1}) }>
            <Text>Balance</Text>
          </Button>
        </Segment>
        <Content padder>
          { this.renderSpinner() }
          {payments}
        </Content>
        <NavigationEvents onWillFocus={() => this.getPayments()} />
      </Container>
    )
  }
}
