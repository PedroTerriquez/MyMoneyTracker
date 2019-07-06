import React, { Component } from 'react';
import { TouchableOpacity} from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';

class BalanceCard extends Component {
  render() {
    const { id, user1, user2, name1, name2, total1, total2 } = this.props
    return(
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Balance',  { id: id} )}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'http://cronicadexalapa.com/wp-content/uploads/2016/11/popo-caca.jpg'}} />
              <Body>
                <Text>{ id }</Text>
                <Text>{ name1 }</Text>
                <Text>{ name2 }</Text>
              </Body>
            </Left>
            <Right>
              <Text>{ total1 }/{total2}</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}
export default withNavigation(BalanceCard)
