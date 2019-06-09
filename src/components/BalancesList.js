import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';

export default class BalancesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      myBalances: [],
    }
    this.getBalances = this.getBalances.bind(this);
    this.renderBalances = this.renderBalances.bind(this);
  }

  componentDidMount() {
    this.getBalances()
  }

  getBalances() {
    axios.get(`${global.API_URL}/balances`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ myBalances: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderBalances() {
    return this.state.myBalances.map( balance => (
      <View>
        <Text>{ balance.id }</Text>
        <Text>{ balance.user1_id }</Text>
        <Text>{ balance.user2_id }</Text>
        <Text>{ balance.balance_user_1 }</Text>
        <Text>{ balance.balance_user_2 }</Text>
        <Text>--------------------------------</Text>
      </View>
    ))
  }

  render() {
    return(
      <ScrollView>
        { this.renderBalances() }
      </ScrollView>
    )
  }
}
