import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

export default class PromiseHeader extends Component {
  render() {
    const { id, title, paid, total } = this.props
    return(
      <View>
        <Text>Id: { id }</Text>
        <Text>Title: { title }</Text>
        <Text>Paid: { paid }</Text>
        <Text>Total: { total }</Text>
      </View>
    )
  }
}
