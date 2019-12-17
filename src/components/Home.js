import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Container, Button, Segment, Content } from 'native-base';
import Payment from './presentational/Payment'
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';
import NotifService from '../services/notifService';

export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      balance_payments: [],
      promise_payments: [],
      tab: 0,
    }
    this.getPayments = this.getPayments.bind(this)
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
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
    if (payments.length == 0) {
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

  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
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
          {payments}
        </Content>
        <NavigationEvents onWillFocus={() => this.getPayments()} />
        <ScrollView >
          <Text style={styles.title}>Example app react-native-push-notification</Text>
          <View style={styles.spacer}></View>
          <TextInput style={styles.textField} value={this.state.registerToken} placeholder="Register token" />
          <View style={styles.spacer}></View>

          <TouchableOpacity style={styles.button} onPress={() => { this.notif.localNotif()    }}><Text>Local Notification (now)</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { this.notif.scheduleNotif() }}><Text>Schedule Notification in 30s</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelNotif()   }}><Text>Cancel last notification (if any)</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelAll()     }}><Text>Cancel all notifications</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { this.notif.checkPermission(this.handlePerm.bind(this)) }}><Text>Check Permission</Text></TouchableOpacity>

          <View style={styles.spacer}></View>
          <TextInput style={styles.textField} value={this.state.senderId} onChangeText={(e) => {this.setState({ senderId: e })}} placeholder="GCM ID" />
          <TouchableOpacity style={styles.button} onPress={() => { this.notif.configure(this.onRegister.bind(this), this.onNotif.bind(this), this.state.senderId) }}><Text>Configure Sender ID</Text></TouchableOpacity>
          {this.state.gcmRegistered && <Text>GCM Configured !</Text>}

          <View style={styles.spacer}></View>
        </ScrollView>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#000000",
    margin: 5,
    padding: 5,
    width: "70%",
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    margin: 5,
    padding: 5,
    width: "70%"
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  }
});
