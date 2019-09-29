import React, { Component } from 'react';
import { TouchableOpacity} from 'react-native';
import { ListItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';

class BalanceCard extends Component {
  render() {
    const { id, user1, user2, name1, name2, total1, total2 } = this.props
    return(
      <ListItem thumbnail onPress={ () => this.props.navigation.navigate('Balance',  { id: id} )}>
        <Left>
          <Thumbnail source={{uri: 'https://picsum.photos/50/50.jpg'}} />
        </Left>
        <Body>
          {/*<Text>{ id }</Text>*/}
          <Text>{ name1 } con { name2 }</Text>
        </Body>
        <Right>
          <Text note>{ total1 || "0%"} / {total2 || "0%"}</Text>
        </Right>
      </ListItem>
    )
  }
}
export default withNavigation(BalanceCard)
