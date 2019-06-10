import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';
import BalanceCard from './presentational/BalanceCard'

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
      <BalanceCard
        id= { balance.id }
        user1= { balance.user1_id }
        user2= { balance.user2_id }
        total1= { balance.balance_user_1 }
        total2= { balance.balance_user_2 }
      />
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
