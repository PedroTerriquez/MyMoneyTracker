import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';

export default class BalanceHeader extends Component {
  render() {
    const { user1, user2, name1, name2, total1, total2 } = this.props
    const mayor = total1 > total2 ? 1 : 2
    const nameMayor = mayor == 1 ? name1: name2
    const debt = mayor == 1 ? total1-total2 : total2-total1
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
							<Thumbnail
								style={{width: 150, height: 150, borderRadius: 100 }}
								source={{uri: 'https://picsum.photos/200/200.jpg'}} />
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
