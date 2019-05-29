import React, { Component } from 'react';
import axios from 'axios';
import { Alert, View, Keyboard, Button, Text, TextInput, StyleSheet } from 'react-native';
import { deviceStorage } from '../services/deviceStorage';
import Links from './Links'

export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      user: 'test1@hotmail.com',
      password: '123456'
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
		if (deviceStorage.loadToken() != null){
			this.props.navigation.navigate('Contacts');
			return
		}

    axios.post(`${global.API_URL}/login`, { email: this.state.user, password: this.state.password },)
      .then((response) => {
        deviceStorage.saveToken(response.data.auth_token);
        this.props.navigation.navigate('Contacts');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return(
      <View style={ styles.container }>
        <Text> Login </Text>
        <Text> Email: </Text>
        <TextInput
          id='user'
          style={ styles.input }
          autoFocus={ true }
          placeholder='Your email'
          onChangeText={ (text) => this.setState({user: text}) }
          keyboardType={ 'email-address' }
          onBlur={ Keyboard.dismiss } />
        <Text> Password: </Text>
        <TextInput
          id='password'
          style={ styles.input }
          placeholder='Your password'
          onBlur={ Keyboard.dismiss }
          onChangeText={ (text) => this.setState({password: text}) }
          secureTextEntry={ true } />
        <Button onPress={ this.handleSubmit } title='Submit' />
        <Text>User: {this.state.user} </Text>
        <Text>Password: {this.state.password} </Text>
      </View>
    )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#8D51B1',
  },
  input:{
    height: 40,
    //backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    //color: '#fff'
  },
})
