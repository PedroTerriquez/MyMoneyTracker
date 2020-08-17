import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
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
      info: null,
      spinner: true
    }
    this.renderPayments = this.renderPayments.bind(this);
  }

  componentDidMount() {
    this.getPayments(this.props.navigation.getParam('id'))
  }

  getPayments = (id) => {
    axios.get(`${global.API_URL}/balances/${id}`, deviceStorage.loadToken() )
      .then((response) => {
        this.setState({ payments: response.data.payments, info: response.data.balance, spinner: false })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderPayments() {
    return this.state.payments.map( payment => (
      <Payment
        amount = { payment.amount }
        creator= { payment.creator_id }
        creatorName= { payment.creator_name }
        date   = { payment.created_at }
        id     = { payment.id }
        key    = { payment.id }
        mine   = { payment.mine }
        method = 'Cash'
        paymentable_id = { payment.paymentable_id }
        recipientName={ this.state.info.counterpart }
        status = { payment.status }
        title  = { payment.title }
        type   = { payment.paymentable_type }
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
              { this.renderSpinner() }
              { this.renderPayments() }
            </ScrollView>
            <View>
              <Fab
                active={false}
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
