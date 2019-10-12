import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { List } from 'native-base'
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
    if (this.state.myBalances.length == 0) {
      return <Text>No balances yet, start one.</Text>
    }
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
        counterpart= { balance.counterpart }
        percentage1= { balance.percetage1 }
        percentage2= { balance.percetage2 }
      />
    ))
  }

  render() {
    return(
      <ScrollView contentContainerStyle={styles.container}>
        { this.renderBalances() }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  }
})
