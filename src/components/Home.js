import React, { Component } from 'react';
import { Container, Button, Segment, Content, Text } from 'native-base';
import Links from './Links'
import Payment from './presentational/Payment'
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      balance_payments: [],
      promise_payments: [],
			tab: 0,
    }
    this.getPayments = this.getPayments.bind(this)
  }

  componentDidMount(){
    this.getPayments()
  }

  getPayments() {
    axios.get(`${global.API_URL}/payments/friends_payments`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ balance_payments: response.data.balance, promise_payments: response.data.promise })
        this.state
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderPayments(payments) {
    return payments.map( payment => (
      <Payment
        key = { payment.id }
        id = { payment.id }
        creator = { payment.creator_id }
        creatorName = { payment.creator_name }
        method ='Cash'
        date = { payment.agreement_date }
        amount = { payment.amount }
        title = { payment.title }
        promise = { payment.payment_promise_id }
        balance = { payment.balance_id }
      />
    ))
  }

  render() {
		payments = this.state.tab == 0 ? this.renderPayments(this.state.promise_payments) : this.renderPayments(this.state.balance_payments)
    return(
			<Container>
				<Segment>
					<Button active={this.state.tab == 0} onPress={ ()=> this.setState({tab: 0}) }>
						<Text>Payment Promises</Text>
					</Button>
					<Button last active={this.state.tab == 1} onPress={ ()=> this.setState({tab: 1}) }>
						<Text>Payment Balance</Text>
					</Button>
				</Segment>
				<Content padder>
					{payments}
				</Content>
			</Container>
    )
  }
}
