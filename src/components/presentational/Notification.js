import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Item, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';
import { deviceStorage } from '../../services/deviceStorage';
import axios from 'axios';

class Notification extends Component {
  accept = (id) => {
    axios.patch(`${global.API_URL}/notifications/${id}`, { status: 'accept' }, deviceStorage.loadToken() )
      .then((response) => {
        console.log(response.data)
        this.props.remove(id)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  reject = (id) => {
    axios.patch(`${global.API_URL}/notifications/${id}`, { status: 'cancel' }, deviceStorage.loadToken() )
      .then((response) => {
        console.log(response.data)
        this.props.remove(id)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  render() {
    const { id, creator, creatorName, type, amount, date } = this.props
    return(
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Home') }>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'http://cronicadexalapa.com/wp-content/uploads/2016/11/popo-caca.jpg'}} />
              <Body>
                <Text>id: { id }</Text>
                <Text>Creator: { creator }</Text>
                <Text>You receive a {type} request from {creatorName}</Text>
                <Text note>{date}</Text>
              </Body>
            </Left>
            <Right>
              <Text>${amount}</Text>
              <Item>
                <Button
                  success
                  small
                  rounded
                  onPress={ () => this.accept(id) }>
                  <Icon type='FontAwesome' name='check' />
                </Button>
                <Button
                  danger
                  rounded
                  small
                  onPress={ () => this.reject(id) }>
                  <Icon type='FontAwesome' name='remove' />
                </Button>
              </Item>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Notification)
