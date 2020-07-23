import React, { Component } from 'react';
import { deviceStorage } from '../services/deviceStorage';
import BalanceCard from './presentational/BalanceCard'
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { Container, Spinner, Fab, Icon } from 'native-base';
import axios from 'axios';

export default class BalancesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      myBalances: [],
      spinner: true,
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
        this.setState({ myBalances: response.data, spinner: false })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderBalances() {
    if (!this.state.spinner && this.state.myBalances.length == 0) {
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

  renderSpinner(){
    if (this.state.spinner) { return <Spinner color='green' />}
  }

  render() {
    return(
      <Container>
      <ScrollView contentContainerStyle={styles.container}>
        { this.renderSpinner() }
        { this.renderBalances() }
      </ScrollView>
        <View>
          <Fab
            active={false}
            style={styles.fab}
            onPress={ () => this.props.navigation.navigate('Contacts')}
            position="bottomRight" >
            <Icon type='Ionicons' name="ios-add" />
          </Fab>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  fab: { backgroundColor: '#5067FF', flex: 1, zIndex: 999 },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  }
})
