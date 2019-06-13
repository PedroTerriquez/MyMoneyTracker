import React, { Component } from 'react';
import { Text, Button, View } from 'react-native';
import { withNavigation } from 'react-navigation';

class PromiseHeader extends Component {
  render() {
    const { id, title, paid, total, navigation, status } = this.props
    return(
      <View>
        <Text>Id: { id }</Text>
        <Text>Title: { title }</Text>
        <Text>Paid: { paid }</Text>
        <Text>Total: { total }</Text>
        { status == 'pending' && <Button title='Edit' onPress={()=> navigation.navigate('AddPromise', { props: this.props }) }/> }
      </View>
    )
  }
}

export default withNavigation(PromiseHeader)
