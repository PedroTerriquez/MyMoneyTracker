import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class BalanceHeader extends Component {
  render() {
    const { user1, user2, name1, name2, total1, total2 } = this.props
    return(
      <View>
        <Text>User 1: { user1 }</Text>
        <Text>User 2: { user2 }</Text>
        <Text>UserName 1: { name1 }</Text>
        <Text>UserName 2: { name2 }</Text>
        <Text>Total User 1: { total1 }</Text>
        <Text>Total User 2: { total2 }</Text>
      </View>
    )
  }
}
