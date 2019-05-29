import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Links from './Links'
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
    axios.get(`${global.API_URL}/friends_payments`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ payments: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderPayments() {
    return this.state.payments.map( payment => ( <Text> { `${payment.id} ${paymnet.title} ${payment.amount}` } </Text>))
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
