import React, { Component } from 'react';
import axios from 'axios';
import { View } from 'react-native';
import { Container, Content, Text, Thumbnail } from 'native-base';
import { deviceStorage } from '../services/deviceStorage';

export default class Profile extends Component {
  constructor(){
    super();
    this.state = {
      info: ''
    };
  }

  componentDidMount() {
    this.getProfileInfo(this.props.navigation.getParam('id'))
  }

  getProfileInfo(id){
    axios.get(`${global.API_URL}/user/${id}`, deviceStorage.loadToken() )
      .then((response) => {
        this.setState({ info: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  render() {
    return(
      <Container>
        <Content>
          <Thumbnail
            style={{width: 200, height: 200, borderRadius: 100}}
            source={{uri: 'https://picsum.photos/300/300.jpg'}} />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {this.state.info.name} </Text>
          <Text style={{ fontSize: 20 }}> Miembro desde {this.state.info.created_at} </Text>
          <Text style={{ fontSize: 20 }}>%{this.state.info.percentage} de pagos a tiempo.</Text>
        </Content>
      </Container>
    )}
}
