import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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
        style={style.rejectButton}
        onPress={ () => this.cancel(id) }>
        <Icon type='FontAwesome' name='remove' style={style.bigIcon} />
      </Button>
    )
  }

  renderPedingButton(id){
    return(
      <View style={style.rowButtons}>
        <Button
          success
          style={style.checkButton}
          onPress={ () => this.accept(id) }>
          <Icon type='FontAwesome' name='check' style={style.midIcon} />
        </Button>
        <Button
          danger
          style={style.secondButton}
          onPress={ () => this.reject(id) }>
          <Icon type='FontAwesome' name='remove' style={style.bigIcon} />
        </Button>
      </View>
    )
  }

  renderNormalButton(id){
    return(
      <View style={style.rowButtons} >
        <Button
          success
          small
          rounded
          style={style.checkButton}
          onPress={ () => this.props.navigation.navigate('AddPromise', {id: id} )} >
          <Icon type='FontAwesome' name="money" style={style.midIcon}/>
        </Button>
        <Button
          warning
          small
          rounded
          style={style.secondButton}
          onPress={ () => this.createBalance(id) } >
          <Icon type='FontAwesome' name="balance-scale" style={style.smallIcon} />
        </Button>
      </View>
    )
  }

  render() {
    const { id, name, type, email, navigation } = this.props
    let buttons;
    if (type == 'sent_request') {
      buttons = this.renderRequestButtons(id)
    } else if (type == 'pending_request'){
      buttons = this.renderPedingButton(id)
    } else if (type == 'normal'){
      buttons = this.renderNormalButton(id)
    }

    return(
      <ListItem thumbnail onPress={()=> navigation.navigate('Profile', {id: id})}>
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

const style = StyleSheet.create({
  rowButtons: {borderColor: 'transparent', flexDirection: 'row'},
  smallIcon: {fontSize: 17, height: 20,width: 20},
  midIcon: {fontSize: 19, height: 20,width: 20},
  midIcon2: {fontSize: 20, height: 20,width: 20},
  bigIcon: {fontSize: 21, width: 15},
  rejectButton: {height: 40,width: 40, borderRadius:50, justifyContent: 'center'},
  checkButton: {height: 40,width: 40, borderRadius:30, justifyContent: 'center'},
  secondButton: {height: 40,width: 40, borderRadius:30, justifyContent: 'center', marginLeft: 8},
})

export default withNavigation(Contact)
