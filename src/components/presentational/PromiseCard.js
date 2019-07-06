import React, { Component } from 'react';
import { TouchableOpacity} from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';

class PromiseCard extends Component {
  render() {
    const { id, title, paid, total, adminName } = this.props
    return(
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Promise',  { id: id} )}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'http://cronicadexalapa.com/wp-content/uploads/2016/11/popo-caca.jpg'}} />
              <Body>
                <Text>{ id }</Text>
                <Text>{ adminName }</Text>
                <Text note>{ title }</Text>
              </Body>
            </Left>
            <Right>
              <Text>{ paid }/{total}</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}
export default withNavigation(PromiseCard)
