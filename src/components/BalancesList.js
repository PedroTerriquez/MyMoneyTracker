import React, { Component } from 'react';
import { ScrollView } from 'react-native';
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
        key= { balance.id }
        user1= { balance.user1_id }
        user2= { balance.user2_id }
        name1= { balance.user1_name }
        name2= { balance.user2_name }
        total1= { balance.user1_money }
        total2= { balance.user2_money }
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
