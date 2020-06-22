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
        <Card transparent>
          <CardItem>
            <Body style={{alignItems: 'center', justifyContent: 'center'}}>
              <Thumbnail source={{uri: 'https://picsum.photos/100/100.jpg'}} />
              <Text style={{textAlign:'center'}} >{ creator }</Text>
              <Speedometer
                style={{padding: 10}}
                size={300}
                value={paid}
                totalValue={total || 0}
                showPercent
                showLabels/>
            </Body>
          </CardItem>
        </Card>
        {/* <Text>Promise id: { id }</Text> */}
        { status == 'pending' && <Button title='Edit' onPress={()=> navigation.navigate('AddPromise', { props: this.props }) }/> }
      </View>
    )
  }
}

export default withNavigation(PromiseHeader)
