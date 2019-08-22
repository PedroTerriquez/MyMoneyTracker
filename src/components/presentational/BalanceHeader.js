import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import PureChart from 'react-native-pure-chart';

export default class BalanceHeader extends Component {
  render() {
    const { user1, user2, name1, name2, total1, total2 } = this.props
    let numberMayor = total1 > total2 ? 1 : 2
    let nameMayor = numberMayor == 1 ? name1: name2
    let debt = numberMayor == 1 ? total1-total2 : total2-total1
    let sampleData = [ { value: total1, label: name1, color: 'red', }, { value: total2, label: name2, color: 'blue' } ]
    return(
      <View>
        <Card>
					<CardItem>
						<Body>
              <Text>{ user1  }/{ user2 }</Text>
              <Text>{ name1  }/{ name2 }</Text>
              <Text>{ total1 }/{total2}</Text>
						</Body>
					</CardItem>
          <CardItem>
            <Left  style={{alignItems: 'center'}}>
              <Thumbnail source={{uri: 'https://picsum.photos/300/300.jpg'}} />
            </Left>
            <Body style={{alignItems: 'center'}}>
            </Body>
            <Right>
              <Thumbnail source={{uri: 'https://picsum.photos/300/300.jpg'}} />
            </Right>
          </CardItem>
          <CardItem>
            <Text>{nameMayor} debe ${debt} pesos.</Text>
          </CardItem>
        </Card>
      </View>
    )
  }
}
