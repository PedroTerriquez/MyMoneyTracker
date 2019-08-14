import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body, Button } from 'native-base';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';

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
    this.setState({ ...this.props.navigation.getParam('props') })
  }

  paymentCreationValues() {
    return values = {
      title: this.state.title,
      amount: this.state.amount,
      balance_id: this.props.navigation.getParam('id'),
      payment_type: this.props.navigation.getParam('type'),
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
        console.log(error);
      })
  }

  newPayment() {
    axios.post(`${global.API_URL}/payments/`, this.paymentCreationValues(), deviceStorage.loadToken() )
      .then((response) => {
        this.props.navigation.goBack();
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  render() {
    return(
      <View>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'https://picsum.photos/100/100.jpg'}} />
              <Body>
                <Text>Sending to JOSE ANGEL</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        <TextInput
          autoFocus={ true }
          adjustsFontSizeToFit={true}
          value={this.state.title}
          style={style.title}
          placeholder='Untitled'
          onChangeText={ (text) => this.setState({title: text}) }
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>$</Text>
          <TextInput
            placeholder='0.0'
            adjustsFontSizeToFit={true}
            style={style.money}
            value={this.state.amount.toString()}
            onChangeText={ (text) => this.setState({amount: text}) }
            keyboardType={ 'numeric' }
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Button rounded danger onPress={ () => this.handleSubmit() }>
            <Text>Pay</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
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
    height: 100,
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 6
  }
})
