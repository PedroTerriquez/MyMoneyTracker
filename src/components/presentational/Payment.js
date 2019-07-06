import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';

class Payment extends Component {
  handleClick = (id, type) => {
    this.props.navigation.navigate(type,  { id: id})
  }

  render() {
    const { id, title, creator, creatorName, method, amount, date, promise, balance, status } = this.props
    return(
      <TouchableOpacity onPress={() => this.handleClick(promise || balance, promise ? 'Promise' : 'Balance')}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'https://picsum.photos/100/100.jpg'}} />
              <Body>
                <Text>id: { id }</Text>
                <Text>Creator: { creator }</Text>
                <Text>Status: { status }</Text>
                <Text>{creatorName}</Text>
                <Text note>{method}</Text>
              </Body>
            </Left>
            <Right>
              <Text note>{date}</Text>
              <Text>{amount}</Text>
              { status == 'pending' &&
              <Button small success onPress={()=> this.props.navigation.navigate('AddPayment', { props: this.props }) }>
                <Icon type='FontAwesome' name='edit' />
              </Button>
              }
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Payment)
