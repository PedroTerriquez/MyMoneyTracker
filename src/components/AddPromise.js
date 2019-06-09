import React, { Component } from 'react';
import { Text, TextInput, Button, View, Picker } from 'react-native';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';

export default class AddPromise extends Component {
  constructor(props){
    super(props);
    this.state = {
      period_quantity: 10,
      period_amount: 10,
      period: 1,
      title: '',
      interest: '',
      amount: '',
      total: '',
    }
    this.newPromise = this.newPromise.bind(this);
  }

  newPromise() {
    values = {
      payment_period_quantity: this.state.period_quantity,
      title: this.state.title,
      amount_payments: this.state.period_amount,
      payment_period: this.state.period,
      interest: this.state.interest,
      total: this.state.total,
      //recipient_id: this.props.navigation.getParam('id')
    }
    axios.post(`${global.API_URL}/payment_promises/`, values, deviceStorage.loadToken() )
      .then((response) => {
        console.log("PROMISE CREATED")
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  render() {
    return(
      <View>
        <Picker
          selectedValue={this.state.period}
          onValueChange={(itemValue, itemIndex) => this.setState({period: itemValue})
          }>
          <Picker.Item label="Daily" value="day" />
          <Picker.Item label="Weekly" value="week" />
          <Picker.Item label="Monthly" value="month" />
      </Picker>
        <TextInput
          placeholder='Times to pay'
          onChangeText={ (text) => this.setState({period_quantity: text}) }
          keyboardType={ 'numeric' }
        />
        <TextInput
          placeholder='Concept'
          onChangeText={ (text) => this.setState({title: text}) }
        />
        <TextInput
          placeholder='Interest'
          onChangeText={ (text) => this.setState({title: text}) }
          keyboardType={ 'numeric' }
        />
        <TextInput
          placeholder='Amount'
          onChangeText={ (text) => this.setState({amount: text}) }
          keyboardType={ 'numeric' }
        />
        <Button
          title='Send'
          onPress={ () => this.newPromise() }
        />
      </View>
    )
  }
}
