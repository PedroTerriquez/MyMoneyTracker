import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Button } from 'native-base';
import TextAvatar from 'react-native-text-thumbnail';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';
import { Money } from '../services/moneyDecorator'
import ToastService from '../services/ToastService.js';
import I18n from "../translations/i18n";

export default class AddPayment extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      amount: '',
    }
    this.newPayment = this.newPayment.bind(this);
  }

  componentDidMount() {
    let props = this.props.navigation.getParam('props')
    this.setState({ ...props })
    if (props) {
      this.setState({amount: Money.currency_to_number(props.amount).toString()})
    }
  }

  paymentCreationValues() {
    return values = {
      title: this.state.title,
      amount: this.state.amount,
      paymentable_id: this.props.navigation.getParam('id'),
      paymentable_type: this.props.navigation.getParam('type'),
      recipient_id: this.props.navigation.getParam('recipient'),
    }
  }

  paymentUpdateValues() {
    return values = {
      id: this.props.navigation.getParam('props').id,
      title: this.state.title,
      amount: this.state.amount,
    }
  }

  handleSubmit() {
    if (this.props.navigation.getParam('props')) {
      this.updatePayment(this.props.navigation.getParam('props').id)
    } else {
      this.newPayment()
    }
  }

  updatePayment(id) {
    axios.patch(`${global.API_URL}/payments/${id}`, this.paymentUpdateValues(), deviceStorage.loadToken() )
      .then((response) => {
        this.props.navigation.goBack();
      })
      .catch((error)=>{
        ToastService.showToast(error.response.data.errors);
      })
  }

  newPayment() {
    axios.post(`${global.API_URL}/payments/`, this.paymentCreationValues(), deviceStorage.loadToken() )
      .then((response) => {
        this.props.navigation.goBack();
      })
      .catch((error)=>{
        ToastService.showToast(error.response.data.errors);
      })
  }

  render() {
    recipientName = this.props.navigation.getParam('recipientName') || this.state.recipientName
    return(
      <View style={style.center}>

        <TextAvatar size={100} type={'circle'}>
          { recipientName }
          </TextAvatar>
          <Text>{ I18n.t("payment_sending") } { recipientName }</Text>
          <Text note>{ this.props.email }</Text>
        <TextInput
          autoFocus={ true }
          adjustsFontSizeToFit={true}
          value={this.state.title}
          style={style.title}
          placeholder={ I18n.t("payment_note") }
          onChangeText={ (text) => this.setState({title: text}) }
        />
        <View style={style.inlineElements}>
          <Text style={style.boldText60}>$ </Text>
          <TextInput
            placeholder='0'
            adjustsFontSizeToFit={true}
            style={style.money}
            value={this.state.amount}
            onChangeText={ (text) => this.setState({amount: text}) }
            keyboardType={ 'numeric' }
          />
        </View>
        <View style={style.inlineElements}>
          <Button
            style={style.centerButton}
            rounded
            danger
            onPress={ () => this.handleSubmit() }>
            <Text>{ (this.state.id) ? 'Update Payment' : 'Pay Pay' }</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  centerButton: {width: 200, justifyContent: 'center', marginTop: 30},
  inlineElements: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  center:{alignItems: 'center'},
  thumbnail: {width: 100, height: 100, borderRadius: 50, margin: 10},
  boldText60: { fontSize: 60, fontWeight: 'bold' },
  label:{
    fontSize: 20,
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 6
  },
  money: {
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})
