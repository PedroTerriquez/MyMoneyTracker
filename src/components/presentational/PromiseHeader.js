import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Body } from 'native-base';
import { withNavigation } from 'react-navigation';
import Speedometer from 'react-native-speedometer-chart';

class PromiseHeader extends Component {
  render() {
    const { id, title, creator, paid, total, navigation, status } = this.props
    return(
      <View>
        <Card >
          <CardItem>
            <Body style={{alignItems: 'center'}}>
              <Thumbnail source={{uri: 'http://cronicadexalapa.com/wp-content/uploads/2016/11/popo-caca.jpg'}} />
              <Text note style={{textAlign:'center'}} >{ creator }</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body style={{alignItems: 'center'}}>
              <Speedometer value={paid} totalValue={total} showPercent showLabels/>
            </Body>
          </CardItem>
        </Card>
        <Text>Promise id: { id }</Text>
        { status == 'pending' && <Button title='Edit' onPress={()=> navigation.navigate('AddPromise', { props: this.props }) }/> }
      </View>
    )
  }
}

export default withNavigation(PromiseHeader)
