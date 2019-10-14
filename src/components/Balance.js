import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Fab, Container, Icon } from 'native-base';
import { deviceStorage } from '../services/deviceStorage';
import { NavigationEvents } from 'react-navigation';
import Payment from './presentational/Payment'
import BalanceHeader from './presentational/BalanceHeader'
import axios from 'axios';

export default class Balance extends Component {

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
    axios.get(`${global.API_URL}/balances/${id}`, deviceStorage.loadToken() )
      .then((response) => {
        this.setState({ payments: response.data.payments, info: response.data.balance })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderPayments() {
    return this.state.payments.map( payment => (
      <Payment
        key    = { payment.id }
        id     = { payment.id }
        creator= { payment.creator_id }
        method ='Cash'
        date   = { payment.created_at }
        amount = { payment.amount }
        status = { payment.status }
        title  = { payment.title }
        mine   = { payment.mine }
        type   = { payment.paymentable_type }
        creatorName= { payment.creator_name }
        recipientName={ this.state.info.counterpart }
        paymentable_id = { payment.paymentable_id }
      />
    ))
  }

  render() {
    const { navigation } = this.props
    const { info } = this.state
    return(
      info &&
          <Container>
            <ScrollView>
              <BalanceHeader
                user1={ info.user1_id }
                user2={ info.user2_id }
                name1={ info.user1_name }
                name2={ info.user2_name }
                total1={ info.user1_money }
                total2={ info.user2_money }
              />
              { this.renderPayments() }
            </ScrollView>
            <View style={styles.flex}>
              <Fab
                active={false}
                style={styles.fab}
                onPress={ () => navigation.navigate('AddPayment', {
                  id: info.id,
                  type: 'Balance',
                  recipientName: info.counterpart
                })}
                position="bottomRight" >
                <Icon type='Ionicons' name="ios-add" />
              </Fab>
            </View>
            <NavigationEvents onWillFocus={() => this.getPayments(info.id)} />
        </Container>
    )
  }
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  fab: { backgroundColor: '#5067FF', flex: 1, zIndex: 999 }
})
