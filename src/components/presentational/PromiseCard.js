import React, { Component } from 'react';
import { TouchableOpacity} from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';

class PromiseCard extends Component {
  render() {
    const { id, title, percentage, paid, total, user} = this.props
    return(
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Promise',  { id: id} )}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'https://picsum.photos/50/50.jpg'}} />
              <Body>
                {/*<Text>{ id }</Text>*/}
                <Text>{ user }</Text>
                <Text note>{ title }</Text>
                <Text note>{ paid } of {total}</Text>
              </Body>
            </Left>
            <Right>
              <Text>{percentage}</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}
export default withNavigation(PromiseCard)
