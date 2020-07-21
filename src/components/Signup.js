import React, { Component } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, Thumbnail } from 'native-base';
import { deviceStorage } from '../services/deviceStorage';
import ToastService from '../services/ToastService.js';
import axios from 'axios';
import I18n from "../translations/i18n";

export default class Signup extends Component {
  constructor(){
    super();
    this.state = {
      user: '',
      password: '',
      first_name: '',
      last_name: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  login(){
    const { user, password} = this.state
    axios.post(`${global.API_URL}/login`, { email: user, password: password},)
      .then((response) => {
        deviceStorage.saveToken(response.data.auth_token);
        this.props.navigation.replace('App');
      })
      .catch((error) => {
        ToastService.showToast(error.response.data.errors);
      });
  }

  handleSubmit() {
    const { user, password, first_name, last_name } = this.state
    const data = { email: user, password: password, first_name: first_name, last_name: last_name }
    axios.post(`${global.API_URL}/users`, data,)
      .then((response) => {
        this.login();
      })
      .catch((error) => {
        ToastService.showToast(error.response.data.errors);
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
              <Text style={style.title}>{I18n.t("signup")}</Text>
            </View>
            <Item stackedLabel>
              <Label>{I18n.t("firstname")}</Label>
              <Input
                id='first_name'
                autoFocus={ true }
                onChangeText={ (text) => this.setState({first_name: text}) }
                onBlur={ Keyboard.dismiss } />
            </Item>
            <Item stackedLabel>
              <Label>{I18n.t("lastname")}</Label>
              <Input
                id='last_name'
                autoFocus={ true }
                onChangeText={ (text) => this.setState({last_name: text}) }
                onBlur={ Keyboard.dismiss } />
            </Item>
            <Item stackedLabel>
              <Label>{I18n.t("email")}</Label>
              <Input
                id='user'
                onChangeText={ (text) => this.setState({user: text}) }
                keyboardType={ 'email-address' }
                onBlur={ Keyboard.dismiss } />
            </Item>
            <Item stackedLabel>
              <Label>{I18n.t("password")}</Label>
              <Input
                id='password'
                onBlur={ Keyboard.dismiss }
                onChangeText={ (text) => this.setState({password: text}) }
                secureTextEntry={ true } />
            </Item>
            <View style={style.center}>
              <Button
                rounded
                dark
                style={style.marginTop20}
                onPress={ this.handleSubmit } >
                <Text>{I18n.t("signup")}</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    )}
}

const style = StyleSheet.create({
  center: { alignItems: 'center' },
  thumbnail: {width: 200, height: 200, borderRadius: 100, margin: 10},
  title: {fontSize: 20, fontWeight: 'bold'},
  marginTop20: {marginTop: 20},
})
