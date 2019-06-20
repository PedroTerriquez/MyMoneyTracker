import React, { Component } from 'react';
import { Text, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';

class BalanceCard extends Component {
  render() {
    const { id, user1, user2, name1, name2, total1, total2 } = this.props
    return(
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Balance',  { id: id} )}>
        <Text>Id: { id }</Text>
        <Text>User1: { user1 }</Text>
        <Text>User2: { user2 }</Text>
        <Text>Name1: { name1 }</Text>
        <Text>Name2: { name2 }</Text>
        <Text>Total1: { total1 }</Text>
        <Text>Total2: { total2 }</Text>
        <Text>--------------------------------</Text>
      </TouchableOpacity>
    )
  }
}
export default withNavigation(BalanceCard)
