import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class Payment extends Component {
  handleClick = (id, type) => {
    this.props.navigation.navigate(type,  { id: id})
  }

  render() {
    const { id, title, creator, method, amount, date, promise, balance } = this.props
    return(
      <TouchableOpacity onPress={() => this.handleClick(promise || balance, promise ? 'Promise' : 'Balance')}>
        <Text>{ creator }</Text>
        <Text>{ method }</Text>
        <Text>{ date }</Text>
        <Text>{ amount }</Text>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Payment)
