import React, { Component } from 'react';
import { Text, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';

class PromiseCard extends Component {
  render() {
    const { id, title, paid, total, adminName } = this.props
    return(
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Promise',  { id: id} )}>
        <Text>Id: { id }</Text>
        <Text>Title: { title }</Text>
        <Text>Paid: { paid }</Text>
        <Text>Total: { total }</Text>
        <Text>Admin: { adminName }</Text>
        <Text>--------------------------------</Text>
      </TouchableOpacity>
    )
  }
}
export default withNavigation(PromiseCard)
