import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card, CardItem, Item, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';
import { deviceStorage } from '../../services/deviceStorage';
import ToastService from '../../services/ToastService.js';
import axios from 'axios';

class Notification extends Component {
  accept = (id) => {
    axios.patch(`${global.API_URL}/notifications/${id}`, { status: 'accept' }, deviceStorage.loadToken() )
      .then((response) => {
        console.log(response.data)
        this.props.remove(id)
      })
      .catch((error)=>{
        ToastService.showToast(error.response.data.errors);
      })
  }

  reject = (id) => {
    axios.patch(`${global.API_URL}/notifications/${id}`, { status: 'cancel' }, deviceStorage.loadToken() )
      .then((response) => {
        console.log(response.data)
        this.props.remove(id)
      })
      .catch((error)=>{
        ToastService.showToast(error.response.data.errors);
      })
  }

  redirect = (id, type) => {
    this.props.navigation.navigate(type, {id: id})
  }

  render() {
    const { id, creator, creatorName, type, amount, date, status } = this.props
    return(
      <TouchableOpacity onPress={ () => this.redirect(id, type) }>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'https://picsum.photos/50/50.jpg'}} />
              <Body>
                {/*<Text>id: { id }</Text>
                <Text>Creator: { creator }</Text>*/}
                <Text>{type} request from {creatorName}</Text>
                <Text note>{date}</Text>
              </Body>
            </Left>
            <Right>
              { amount && <Text>${amount}</Text> }
              <Item>
                { (status == 'pending') && <View>
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
                  </View>
                }
              </Item>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Notification)
