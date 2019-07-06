import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Item, Icon, Text, Card, CardItem, Button, Right, Left, Body } from 'native-base';
import { withNavigation } from 'react-navigation';
import { deviceStorage } from '../../services/deviceStorage';
import axios from 'axios';

class Contact extends Component {
  accept = (id) => {
    axios.post(`${global.API_URL}/friendships/${id}/accept`, {}, deviceStorage.loadToken() )
      .then((response) => {
        console.log(response.data)
        this.props.delete(id)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  reject = (id) => {
    axios.post(`${global.API_URL}/friendships/${id}/reject`, {}, deviceStorage.loadToken() )
      .then((response) => {
        this.props.delete(id)
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  cancel = (id) => {
    axios.post(`${global.API_URL}/friendships/${id}/cancel`, {}, deviceStorage.loadToken() )
      .then((response) => {
        console.log(response.data)
        this.props.delete(id)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  createBalance(id){
    axios.post(`${global.API_URL}/balances/`, {user2_id: id}, deviceStorage.loadToken() )
      .then((response) => {
        console.log("BALANCE CREATED")
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderRequestButtons(id){
    return(
      <Button
        danger
        small
        rounded
        onPress={ () => this.cancel(person.id) }>
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
          onPress={ () => this.accept(person.id) }>
          <Icon type='FontAwesome' name='check' />
        </Button>
        <Button
          danger
          small
          rounded
          onPress={ () => this.reject(person.id) }>
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
        <Text>New Promise</Text>
      </Button>
      <Button
        warning
        small
        rounded
        onPress={ () => this.createBalance(id) } >
        <Text>New Balance</Text>
      </Button>
    </Item>
    )
  }

  render() {
    const { id, name, type } = this.props
    let buttons;
    if (type == 'request') {
      buttons = this.renderRequestButtons(id)
    } else if (type == 'pending'){
      buttons = this.renderPedingButton(id)
    } else if (type == 'normal'){
      buttons = this.renderNormalButton(id)
    }

    return(
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Home') }>
        <Card>
          <CardItem>
              <Body>
                <Text note>{id}</Text>
                <Text>{name}</Text>
              </Body>
              <Right>
                { buttons }
              </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Contact)
