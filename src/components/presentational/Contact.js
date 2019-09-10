import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Item, Icon, Text, Card, CardItem, Button, Right, Left, Body, Thumbnail } from 'native-base';
import { withNavigation } from 'react-navigation';
import { deviceStorage } from '../../services/deviceStorage';
import ToastService from '../../services/ToastService.js';
import axios from 'axios';

class Contact extends Component {
  accept = (id) => {
    axios.post(`${global.API_URL}/friendships/${id}/accept`, {}, deviceStorage.loadToken() )
      .then((response) => {
        this.props.delete(id)
      })
      .catch((error)=>{
        ToastService.showToast(error.response.data.errors);
      })
  }

  reject = (id) => {
    axios.post(`${global.API_URL}/friendships/${id}/reject`, {}, deviceStorage.loadToken() )
      .then((response) => {
        this.props.delete(id)
      })
      .catch((error)=>{
        ToastService.showToast(error.response.data.errors);
      })
  }

  cancel = (id) => {
    axios.post(`${global.API_URL}/friendships/${id}/cancel`, {}, deviceStorage.loadToken() )
      .then((response) => {
        this.props.delete(id)
      })
      .catch((error)=>{
        ToastService.showToast(error.response.data.errors);
      })
  }

  createBalance(id){
    axios.post(`${global.API_URL}/balances/`, {user2_id: id}, deviceStorage.loadToken() )
      .then((response) => {
        this.props.navigation.navigate('Balance', {id: response.data.id})
      })
      .catch((error)=>{
        ToastService.showToast(error.response.data.errors);
      })
  }

  renderRequestButtons(id){
    return(
      <Button
        danger
        small
        rounded
        onPress={ () => this.cancel(id) }>
        <Icon type='FontAwesome' name='remove' />
      </Button>
    )
  }

  renderPedingButton(id){
    return(
      <Item style={{borderColor: 'transparent'}}>
        <Button
          success
          small
          rounded
          onPress={ () => this.accept(id) }>
          <Icon type='FontAwesome' name='check' />
        </Button>
        <Button
          danger
          small
          rounded
          onPress={ () => this.reject(id) }>
          <Icon type='FontAwesome' name='remove' />
        </Button>
      </Item>
    )
  }

  renderNormalButton(id){
    return(
      <Item style={{borderColor: 'transparent'}} >
      <Button
        success
        small
        rounded
        onPress={ () => this.props.navigation.navigate('AddPromise', {id: id} )} >
        <Text>Promise</Text>
      </Button>
      <Button
        warning
        small
        rounded
        onPress={ () => this.createBalance(id) } >
        <Text>Balance</Text>
      </Button>
    </Item>
    )
  }

  render() {
    const { id, name, type } = this.props
    let buttons;
    if (type == 'sent_request') {
      buttons = this.renderRequestButtons(id)
    } else if (type == 'pending_request'){
      buttons = this.renderPedingButton(id)
    } else if (type == 'normal'){
      buttons = this.renderNormalButton(id)
    }

    return(
      <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile', {id: id})}>
        <Card>
          <CardItem>
            <Thumbnail source={{uri: 'https://picsum.photos/100/100.jpg'}} />
            <Body>
              {/*<Text note>Friendship id: {id}</Text>*/}
              <Text>{name}</Text>
              <Right>
                { buttons }
              </Right>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Contact)
