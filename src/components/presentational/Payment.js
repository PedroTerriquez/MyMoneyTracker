import React, { Component } from 'react';
import { Button, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class Payment extends Component {
  handleClick = (id, type) => {
    this.props.navigation.navigate(type,  { id: id})
  }

  render() {
    const { id, title, creator, creatorName, method, amount, date, promise, balance, status } = this.props
    return(
      <TouchableOpacity onPress={() => this.handleClick(promise || balance, promise ? 'Promise' : 'Balance')}>
        <Text>id: { id }</Text>
        <Text>Creator: { creator }</Text>
        <Text>Creator: { creatorName }</Text>
        <Text>Method: { method }</Text>
        <Text>Date: { date }</Text>
        <Text>Amount: { amount }</Text>
        { status == 'pending' && <Button title='Edit' onPress={()=> this.props.navigation.navigate('AddPayment', { props: this.props }) }/> }
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Payment)
