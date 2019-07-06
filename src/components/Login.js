import React, { Component } from 'react';
import axios from 'axios';
import { View, Keyboard } from 'react-native';
import { Container, Content, CardItem, Form, Item, Input, Label, Button, Text, Right, Thumbnail } from 'native-base';
import { deviceStorage } from '../services/deviceStorage';

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
    if (global.JWT != null){
      this.props.navigation.navigate('Home');
    }

    axios.post(`${global.API_URL}/login`, { email: this.state.user, password: this.state.password },)
      .then((response) => {
        deviceStorage.saveToken(response.data.auth_token);
        this.props.navigation.replace('Home');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return(
      <Container>
        <Content>
          <Form style={{alignItems: 'center'}}>
            <Thumbnail
              style={{width: 200, height: 200, borderRadius: 100}}
              source={{uri: 'https://picsum.photos/300/300.jpg'}} />
            <Text style={{fontSize: 20, fontWeight: 'bold'}}> Login </Text>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                id='user'
                autoFocus={ true }
                onChangeText={ (text) => this.setState({user: text}) }
                keyboardType={ 'email-address' }
                onBlur={ Keyboard.dismiss } />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                id='password'
                onBlur={ Keyboard.dismiss }
                onChangeText={ (text) => this.setState({password: text}) }
                secureTextEntry={ true } />
            </Item>
            <CardItem>
              <Right>
                <Text>Forgot your password?</Text>
              </Right>
            </CardItem>
            <Button
              rounded
              dark
              onPress={ this.handleSubmit } >
              <Text>LOGIN</Text>
            </Button>
          </Form>
          <Text>or login with</Text>
          <Text>Don’t have an account? SIGN UP</Text>
          <Text>Testing buttons</Text>
          <Button small onPress={ ()=>this.setState({user: 'test2@hotmail.com'})}><Text>User2</Text></Button>
          <Button small onPress={ ()=>this.setState({user: 'test3@hotmail.com'})}><Text>User3</Text></Button>
        </Content>
      </Container>
    )}
}
