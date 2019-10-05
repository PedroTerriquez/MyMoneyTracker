import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Icon, Text, ListItem, Button, Right, Left, Body, Thumbnail } from 'native-base';
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
        style={{height: 40,width: 40, borderRadius:50, justifyContent: 'center'}}
        onPress={ () => this.cancel(id) }>
        <Icon type='FontAwesome' name='remove' style={{fontSize: 21, width: 15}} />
      </Button>
    )
  }

  renderPedingButton(id){
    return(
      <View style={{borderColor: 'transparent', flexDirection: 'row'}}>
        <Button
          success
          style={{height: 40,width: 40, borderRadius:30, justifyContent: 'center'}}
          onPress={ () => this.accept(id) }>
          <Icon type='FontAwesome' name='check' style={{fontSize: 20, height: 20,width: 20}} />
        </Button>
        <Button
          danger
          style={{marginLeft: 8, height: 40,width: 40, borderRadius:30, justifyContent: 'center'}}
          onPress={ () => this.reject(id) }>
          <Icon type='FontAwesome' name='remove' style={{fontSize: 21, width: 15}} />
        </Button>
      </View>
    )
  }

  renderNormalButton(id){
    return(
      <View style={{flexDirection: 'row'}} >
        <Button
          success
          small
          rounded
          style={{height: 40,width: 40, borderRadius:30, justifyContent: 'center'}}
          onPress={ () => this.props.navigation.navigate('AddPromise', {id: id} )} >
          <Icon type='FontAwesome' name="money" style={{fontSize: 19, height: 20,width: 20}}/>
        </Button>
        <Button
          warning
          small
          rounded
          style={{marginLeft: 8, height: 40,width: 40, borderRadius:30, justifyContent: 'center'}}
          onPress={ () => this.createBalance(id) } >
          <Icon type='FontAwesome' name="balance-scale" style={{fontSize: 17, height: 20,width: 20}} />
        </Button>
      </View>
    )
  }

  render() {
    const { id, name, type, email } = this.props
    let buttons;
    if (type == 'sent_request') {
      buttons = this.renderRequestButtons(id)
    } else if (type == 'pending_request'){
      buttons = this.renderPedingButton(id)
    } else if (type == 'normal'){
      buttons = this.renderNormalButton(id)
    }

    return(
      <ListItem thumbnail onPress={()=> this.props.navigation.navigate('Profile', {id: id})}>
        <Left>
          <Thumbnail source={{uri: 'https://picsum.photos/100/100.jpg'}} />
        </Left>
        <Body>
          {/*<Text note>Friendship id: {id}</Text>*/}
          <Text>{name}</Text>
          <Text note>{email}</Text>
        </Body>
        <Right>
          { buttons }
        </Right>
      </ListItem>
    )
  }
}

export default withNavigation(Contact)
