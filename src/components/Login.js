import React, { Component } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Container, Content, CardItem, Form, Item, Input, Label, Button, Text, Right, Thumbnail } from 'native-base';
import { deviceStorage } from '../services/deviceStorage';
import ToastService from '../services/ToastService.js';
import axios from 'axios';

export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      user: 'test1@example.com',
      password: '123456',
      errors: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {

    axios.post(`${global.API_URL}/login`, { email: this.state.user, password: this.state.password },)
      .then((response) => {
        deviceStorage.saveToken(response.data.auth_token);
        this.props.navigation.navigate('App');
      })
      .catch((error) => {
        ToastService.showToast('Wrong email or password');
      });
  }

  render() {
    return(
      <Container>
        <Content>
          <Form>
            <View style={style.center}>
              <Thumbnail
                style={style.thumbnail}
                source={{uri: 'https://picsum.photos/300/300.jpg'}} />
              <Text style={style.title}> Login </Text>
            </View>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                id='user'
                onChangeText={ (text) => this.setState({user: text}) }
                keyboardType={ 'email-address' }
                onBlur={ Keyboard.dismiss } />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                id='password'
                onBlur={ Keyboard.dismiss }
                onChangeText={ (text) => this.setState({password: text}) }
                secureTextEntry={ true } />
            </Item>
            <View style={style.center}>
              <CardItem style={style.marginTop20}>
                <Right>
                  <Text>Forgot your password?</Text>
                </Right>
              </CardItem>
              <Button
                style={style.buttonCenter}
                rounded
                dark
                onPress={ this.handleSubmit } >
                <Text>LOGIN</Text>
              </Button>
            </View>
          </Form>
          {/* <Text>or login with</Text>*/}
          <Text>Testing buttons</Text>
          <Button small onPress={ ()=>this.setState({user: 'test2@example.com'})}><Text>User2</Text></Button>
          <Button small onPress={ ()=>this.setState({user: 'test3@example.com'})}><Text>User3</Text></Button>
        </Content>
        <View style={style.inline} >
          <Text>Don’t have an account?</Text>
          <Button transparent onPress={()=>this.props.navigation.replace('Signup')}>
            <Text>Sign Up</Text>
          </Button>
				</View>
      </Container>
    )}
}

const style = StyleSheet.create({
  center: { alignItems: 'center' },
  thumbnail: {width: 200, height: 200, borderRadius: 100, margin: 10},
  title: {fontSize: 20, fontWeight: 'bold'},
  buttonCenter: {width: 200, justifyContent: 'center', marginTop: 30},
  marginTop20: {marginTop: 20},
  inline: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
})
